import { _decorator, Component, Vec3, Vec2, Node, input, Input, EventKeyboard, KeyCode, misc} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private direction:Vec3 = Vec3.ZERO.clone();

    @property
    speed = 0;

    @property(Node)
    weapon = null;

    // 旋转速度，可以根据需求调整
    @property
    rotationSpeed: number = 100; // 单位：度/秒

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
            // console.log("update, node.position:" + this.node.position);
        }

        this.updateWeapon(deltaTime);
    }

    updateWeapon(dt: number) {
        // 计算旋转角度
        const angle = this.rotationSpeed * dt;

        // 将角度转换为弧度
        const radian = misc.degreesToRadians(angle);

        // 获取相对于rotationCenter节点的旋转位置
        const rotatingPosition = this.weapon.position.subtract(this.node.position);

        // 计算旋转后的位置
        const rotatedX = rotatingPosition.x * Math.cos(radian) - rotatingPosition.y * Math.sin(radian);
        const rotatedY = rotatingPosition.x * Math.sin(radian) + rotatingPosition.y * Math.cos(radian);

        // 将旋转后的位置重新赋值给rotatingImage节点（转换回世界坐标）
        this.weapon.setPosition(this.node.position.x + rotatedX, this.node.position.y + rotatedY);
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


