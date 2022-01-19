# n-switch

> 请结合 n + zsh 使用

使用 n 作为版本管理，根据 nvmrc 自动 switch node version

```zsh
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
    node ~/workspace/src/useful-scripts/n-switch.js
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```
