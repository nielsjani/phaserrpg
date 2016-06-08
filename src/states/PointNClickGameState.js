export default class PointNClickGameState extends Phaser.State {

	//init(rooms){
	//	this.rooms = rooms;
	//	this.currentRoom = rooms[0];
	//}
    //
	//create() {
	//	this.roomlayer = this.add.group();
	//	this.itemlayer = this.add.group();
	//	this.room = this.roomlayer.create(0,0, this.currentRoom.roomname);
	//	this.addAllItems();
	//	this.add.button(20,20, "left", this.goLeft,this, 2,1,0);
	//	this.add.button(this.game.width-40,20, "right", this.goRight,this, 2,1,0);
	//}
    //
	//goLeft(){
	//	this.roomlayer.removeAll();
	//	this.itemlayer.removeAll();
	//	this.currentRoom = this.rooms.filter(room => room.roomname === this.currentRoom.leftroomname)[0];
	//	this.roomlayer.create(0,0, this.currentRoom.roomname);
	//	this.addAllItems();
	//}
    //
	//goRight(){
	//	this.roomlayer.removeAll();
	//	this.itemlayer.removeAll();
	//	this.currentRoom = this.rooms.filter(room => room.roomname === this.currentRoom.rightroomname)[0];
	//	this.roomlayer.create(0,0, this.currentRoom.roomname);
	//	this.addAllItems();
	//}
    //
	//addAllItems() {
	//	this.currentRoom.items.forEach(item => this.itemlayer.create(item.x, item.y, item.name));
	//	this.itemlayer.setAll("inputEnabled", true);
	//	this.itemlayer.callAll("events.onInputDown.add", "events.onInputDown", this.doItemThingy);
	//}
    //
	//doItemThingy(item) {
	//	console.log(item);
	//	item.parent.remove(item);
	//}
}


