import { _decorator, Component, Node, Vec2, Collider2D, Contact2DType, PhysicsSystem2D, IPhysics2DContact} from 'cc';
import RotateAround from './RotateAround';
const { ccclass, property } = _decorator;

@ccclass('SwordController')
export class SwordController extends Component {

    start () {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }

        // 下面也可以用，但是选择一种就行
        // 注册全局碰撞回调函数
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        //     PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        // }
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次

        // 改变旋转方向的思路
        // 计算接触点到围绕中心点的向量与sword当前的向量之间的角度。
        // 然后用这个角度与当前是顺时针还是逆时针向比较，从而判断是否要改变旋转的方向。

        console.log('onBeginContact, contact:', contact.getWorldManifold());
        console.log('onBeginContact, vec2:', contact.getWorldManifold().normal.clone().subtract(
            new Vec2(
                this.getComponent(RotateAround).target.getPosition().x,
                this.getComponent(RotateAround).target.getPosition().y,
            )
        ));

        let around = this.getComponent(RotateAround);
        around.clockwise = !around.clockwise;
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('onEndContact, contact:', contact);
    }
    onPreSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        console.log('onPreSolve');
    }
    onPostSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        console.log('onPostSolve');
    }

    update(deltaTime: number) {
        
    }
}


