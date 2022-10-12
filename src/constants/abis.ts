// https://ethereum.org/en/developers/docs/standards/tokens/erc-20
export const erc20ABI = [
    'event Approval(address indexed _owner, address indexed _spender, uint256 _value)',
    'event Transfer(address indexed _from, address indexed _to, uint256 _value)',
    'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',
    'function approve(address _spender, uint256 _value) public returns (bool success)',
    'function balanceOf(address _owner) public view returns (uint256 balance)',
    'function decimals() public view returns (uint8)',
    'function name() public view returns (string)',
    'function symbol() public view returns (string)',
    'function totalSupply() public view returns (uint256)',
    'function transfer(address _to, uint256 _value) public returns (bool success)',
    'function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)',
]