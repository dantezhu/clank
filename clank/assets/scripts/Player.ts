import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    start() {

        console.log("player start");
    }

    update(deltaTime: number) {
        
    }
}


