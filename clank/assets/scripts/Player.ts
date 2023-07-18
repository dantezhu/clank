import { _decorator, Component, Vec3, Node, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private direction:Vec3 = Vec3.ZERO.clone();

    @property()
    speed = 0;

    onLoad () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

        console.log("player start, node.position:" + this.node.position);
    }

    update(deltaTime: number) {
        if (!this.direction.equals(Vec3.ZERO)) {

            // console.log("speed direction:" + this.direction.clone().multiplyScalar(this.speed * deltaTime));

            this.node.position = this.node.position.clone().add(this.direction.clone().multiplyScalar(this.speed * deltaTime));
            console.log("update, node.position:" + this.node.position);
        }
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                console.log('Press a key');
                this.direction.add(new Vec3(-1, 0, 0));
                break;
            case KeyCode.KEY_D:
                console.log('Press d key');
                this.direction.add(new Vec3(1, 0, 0));
                break;
            case KeyCode.KEY_W:
                console.log('Press w key');
                this.direction.add(new Vec3(0, 1, 0));
                break;
            case KeyCode.KEY_S:
                console.log('Press s key');
                this.direction.add(new Vec3(0, -1, 0));
                break;
        }
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                console.log('Press a key');
                this.direction.subtract(new Vec3(-1, 0, 0));
                break;
            case KeyCode.KEY_D:
                console.log('Press d key');
                this.direction.subtract(new Vec3(1, 0, 0));
                break;
            case KeyCode.KEY_W:
                console.log('Press w key');
                this.direction.subtract(new Vec3(0, 1, 0));
                break;
            case KeyCode.KEY_S:
                console.log('Press s key');
                this.direction.subtract(new Vec3(0, -1, 0));
                break;
        }
    }

}


