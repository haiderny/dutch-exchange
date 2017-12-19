pragma solidity 0.4.18;
import "../Tokens/StandardToken.sol";
import "../Utils/Math.sol";


/// @title Standard token contract with overflow protection
contract TokenTUL is StandardToken {
    using Math for *;

    struct unlockedTUL {
        uint amountUnlocked;
        uint withdrawalTime;
    }

    /*
     *  Storage
     */

    address owner;
    address minter;

    // user => unlockedTUL
    mapping (address => unlockedTUL) public unlockedTULs;

    // user => amount
    mapping (address => uint) public lockedTULBalances;

    /*
     *  Public functions
     */

    function TokenTUL(
     	address _owner,
        address _minter
 	)
 		public
 	{
 		owner = _owner;
        minter = _minter;
 	}

 	function updateOwner(
 		address _owner
	)
		public
	{
        require(msg.sender == owner);
		owner = _owner;
	}

    function updateMinter(
        address _minter
    )
        public
    {
        require(msg.sender == owner);
        minter = _minter;
    }

    function mintTokens(
        address user,
     	uint amount
 	)
    	public
    {
        require(msg.sender == minter);

        lockedTULBalances[user] += amount;
    	totalTokens += amount;
    }

    /// @dev Lock TUL
    function lockTokens(
        uint amount
    )
        public
        returns (uint totalAmountLocked)
    {
        // Adjust amount by balance
        amount = Math.min(amount, balances[msg.sender]);
        
        // Update state variables
        balances[msg.sender] -= amount;
        lockedTULBalances[msg.sender] += amount;

        // Get return variable
        totalAmountLocked = lockedTULBalances[msg.sender];
    }

    function unlockTokens(
        uint amount
    )
        public
        returns (uint totalAmountUnlocked, uint withdrawalTime)
    {
        // Adjust amount by locked balances
        amount = Math.min(amount, lockedTULBalances[msg.sender]);

        // Update state variables
        lockedTULBalances[msg.sender] -= amount;
        unlockedTULs[msg.sender].amountUnlocked += amount;
        unlockedTULs[msg.sender].withdrawalTime = now + 24 hours;

        // Get return variables
        totalAmountUnlocked = unlockedTULs[msg.sender].amountUnlocked;
        withdrawalTime = unlockedTULs[msg.sender].withdrawalTime;
    }

    function getLockedAmount(
        address user
    )
        constant
        public
        returns (uint lockedTULs)
    {
        lockedTULs = lockedTULBalances[user];
    }
}
