# linke-community-plug-in
Decentralized communities can be plug-and-play anywhere

## Install
```
npm install linke-community-plug-in
```

## Using
```
import 'linke-community-plug-in/dist/index.css';
import { Chat } from "linke-community-plug-in"
<Chat roomAddress={'0xbe0acae9883e5e47c012c79241af84959010e9c3'} chatHeight={"700px"}/>

```

## props
| name | type | description |
| :----:| :----: | :---- |
| roomAddress | string | A valid group chat address |
| chatHeight | string | optional, give only if you want to have a fixed height |