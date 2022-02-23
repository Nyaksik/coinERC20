//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CoinERC20 {
    address private _owner;
    string private _name;
    string private _symbol;
    uint private _decimals;
    uint private _totalSupply;

    mapping(address => uint) private _balances;
    mapping(address => mapping(address => uint)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor() {
        _owner = msg.sender;
        _name = "NyanNyanCoin";
        _symbol = "NNC";
        _decimals = 18;
    }

    modifier _onlyOwner() {
        require(msg.sender == _owner, "You are not the owner");
        _;
    }

    function name() external view returns(string memory) {
        return _name;
    }

    function symbol() external view returns(string memory) {
        return _symbol;
    }

    function decimals() external view returns(uint) {
        return _decimals;
    }

    function totalSupply() external view returns(uint) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns(uint) {
        return _balances[account];
    }

    function allowance(address owner, address spender) external view returns(uint) {
        return _allowances[owner][spender];
    }

    function mint(address account, uint amount) external _onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint amount) external _onlyOwner {
        _burn(account, amount);
    }

    function transfer(address to, uint amount) external returns(bool success) {
        _transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(address from, address to, uint amount) external returns(bool success) {
        uint _currentAllowance = this.allowance(from, msg.sender);

        require(_currentAllowance >= amount, "The amount exceeds the allowance");

        _transfer(from, to, amount);
        _approve(from, msg.sender, _currentAllowance - amount);

        return true;
    }

    function approve(address spender, uint amount) external returns(bool success) {
        _approve(msg.sender, spender, amount);

        return true;
    }

    function increaseAllowance(address spender, uint amount) external returns(bool success) {
        uint _currentAllowance = this.allowance(msg.sender, spender);

        require(spender != address(0), "Cannot be the zero address");

        _approve(msg.sender, spender, _currentAllowance + amount);

        return true;
    }

    function decreaseAllowance(address spender, uint amount) external returns(bool success) {
        uint _currentAllowance = this.allowance(msg.sender, spender);

        require(spender != address(0), "Cannot be the zero address");
        require(_currentAllowance >= amount, "The amount exceeds the allowance");
        
        _approve(msg.sender, spender, _currentAllowance - amount);

        return true;
    }

    // Helper function

    function _mint(address account, uint amount) internal {
        require(account != address(0), "Cannot be the zero address");

        _totalSupply += amount;
        _balances[account] += amount;

        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint amount) internal {
        require(account != address(0), "Cannot be the zero address");
        require(this.balanceOf(account) >= amount, "Must have at least amount tokens");

        _totalSupply -= amount;
        _balances[account] -= amount;

        emit Transfer(account, address(0), amount);
    }

    function _transfer(address from, address to, uint amount) internal {
        require(from != address(0), "Cannot be the zero address");
        require(to != address(0), "Cannot be the zero address");
        require(this.balanceOf(from) >= amount, "Must have at least amount tokens");

        _balances[from] -= amount;
        _balances[to] += amount;

        emit Transfer(from, to, amount);
    }

    function _approve(address owner, address spender, uint amount) internal {
        require(owner != address(0), "Cannot be the zero address");
        require(spender != address(0), "Cannot be the zero address");

        _allowances[owner][spender] = amount;

        emit Approval(owner, spender, amount);
    }
}
