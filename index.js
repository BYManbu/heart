var line = 26;   	//每个方格的边长
var gap = 4;		//每个方格之间的距离
var xin = [];		//
var srcX = 0;
var srcY = 650;
var xinDx = 1500 - (1500/2)/2 - 199;
var xinDy = (720/2)/2 - 100;
					//  1   2   3   4   5   6   7   8   9   10  11  12  13  
var xinMode = new Array(0 , 2 , 0 , 0 , 0 , 0 , 0 , 2 , 1 , 2 , 1 , 0 , 0 , 
						// 14  15  16  17  18  19  20  21  22  23  24  25  26
							0 , 2 , 2 , 2 , 2 , 0 , 1 , 0 , 2 , 0 , 2 , 1 , 2 );
var xinType = new Array(1 , 1 , 3 , 3 , 1 , 3 , 2 , 0 , 2 , 1 , 3 , 0 , 0 , 
							3 , 0 , 2 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 1 , 1 );
							
var xinP = new Array(cc.p(xinDx					, xinDy + 4*line + 3*gap),//1
					cc.p(xinDx + line*2 + gap*2	, xinDy + 4*line + 3*gap),//2
					cc.p(xinDx - line - gap		, xinDy + 3*line + 2*gap),//3
					cc.p(xinDx - 3*line - 3*gap	, xinDy + 5*line + 4*gap),//4
					cc.p(xinDx - 2*line - 2*gap	, xinDy + 5*line + 4*gap),//5
					cc.p(xinDx					, xinDy + 6*line + 5*gap),//6
					cc.p(xinDx + 3*line + 3*gap	, xinDy + 5*line + 4*gap),//7
					cc.p(xinDx + 3*line + 3*gap	, xinDy + 6*line + 5*gap),//8
					cc.p(xinDx + 6*line + 6*gap	, xinDy + 7*line + 6*gap),//9
					cc.p(xinDx + line + gap		, xinDy + 6*line + 5*gap),//10
					cc.p(xinDx - 5*line - 5*gap	, xinDy + 6*line + 5*gap),//11
					cc.p(xinDx - 4*line - 4*gap	, xinDy + 7*line + 6*gap),//12
					cc.p(xinDx + 4*line + 4*gap	, xinDy + 9*line + 8*gap),//13			
					cc.p(xinDx - 4*line - 4*gap	, xinDy + 9*line + 8*gap),//14
					cc.p(xinDx - 3*line - 3*gap	, xinDy + 8*line + 7*gap),//15
					cc.p(xinDx					, xinDy + 9*line + 8*gap),//16
					cc.p(xinDx + 3*line + 3*gap	, xinDy + 9*line + 8*gap),//17
					cc.p(xinDx + line + gap		, xinDy + 9*line + 8*gap),//18
					cc.p(xinDx - 6*line - 6*gap	, xinDy + 10*line + 9*gap),//19
					cc.p(xinDx + 5*line + 5*gap	, xinDy + 11*line + 10*gap),//20
					cc.p(xinDx					, xinDy + 10*line + 9*gap),//21
					cc.p(xinDx - 3*line - 3*gap	, xinDy + 10*line + 9*gap),//22
					cc.p(xinDx + line*2 + gap*2	, xinDy + 11*line + 10*gap),//23
					cc.p(xinDx - 3*line - 3*gap	, xinDy + 12*line + 11*gap),//24
					cc.p(xinDx + 4*line + 4*gap	, xinDy + 12*line + 11*gap),//25
					cc.p(xinDx - 4*line - 4*gap	, xinDy + 12*line + 11*gap),//26
					);;

var step = 0;

function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

//设置颜色列表
var colList = new Array(cc.color(138,43,226,255),
					cc.color(255,246,143,255),
					cc.color(0 ,255,255,255),
					cc.color(255 ,106 ,106,255),
					cc.color(255 ,0 ,255,255),
					cc.color(0 ,0 ,238,255),
					cc.color(238 ,130 ,98,255),
					cc.color(255 ,20 ,147,255),
					cc.color(0 ,238 ,118,255),
					cc.color(255 ,131 ,250,255),
					cc.color(155 ,48 ,255,255),
					cc.color(0 ,229 ,238,255),
					cc.color(232 ,232 ,232,255),
					cc.color(144, 238 ,144,255)
					);

//心的颜色
var redCpl = new Array(cc.color(255,0,0,255),
						cc.color(255,128,0,255 ),
						cc.color(255,255,0,255),
						cc.color(0,255,0,255),
						cc.color(0,255,255,255),
						cc.color(0,0,255,255),
						cc.color(128,0,255,255),);
//心的颜色的索引
var redIndex = 0;
//获取随机数
function GetRandomNum()
{    
	var Rand = Math.random();   
	return Math.round(Rand * 14);   
}  

//方块类
var squ = function(x,y){
	this.a = cc.p(x,y);
	this.b = cc.p(x+line,y);
	this.c = cc.p(x,y-line);
	this.d = cc.p(x+line,y-line);
	
	//方块的四个坐标点
	this.setP = function(x,y){
		this.a = cc.p(x,y);
		this.b = cc.p(x+line,y);
		this.c = cc.p(x,y-line);
		this.d = cc.p(x+line,y-line);
	};
}

//长方块类
var stick = function(x,y){
	this.one = new squ(x,y);   					//第一个方块
	this.two = new squ(this.one.b.x + gap, y);	//第二个方块
	this.thr = new squ(this.two.b.x + gap, y);	//第三个方块
	this.for = new squ(this.thr.b.x + gap, y);	//第四个方块
	this.col = colList[GetRandomNum()];			//随机获取颜色
	this.draw = new cc.DrawNode();				//获取绘图对象
	this.gaibian = 0;							//目前变化的形态值
	this.bianhuaMax = 2;						//可以变化的形态最大值	
	
	var bianNum = 0;
	var goNUM = 0;
		
	var gaibianTmp = 0;
	var msecTmp = 0;
	var nextBian = 0;
	
	//绘制图形
	this.drawTuxing = function(){
        //fill
		this.draw.drawRect(this.one.a, this.one.d, this.col, 1, this.col);
		this.draw.drawRect(this.two.a, this.two.d, this.col, 1, this.col);
		this.draw.drawRect(this.thr.a, this.thr.d, this.col, 1, this.col);
		this.draw.drawRect(this.for.a, this.for.d, this.col, 1, this.col);
    }
    
	//设置图形的变化模式
    this.setMode = function(type){
	
	}
	
	//改变图形的形态
	this.bianhuan = function(step){
		//this.draw.clear();
		if(this.gaibian != step){
			this.gaibian = (this.gaibian + 1)%2;
			if(this.gaibian == 0){
				this.two.setP(this.one.b.x + gap, this.one.a.y);
				this.thr.setP(this.two.b.x + gap, this.one.a.y);
				this.for.setP(this.thr.b.x + gap, this.one.a.y);
			
			}else{
				this.two.setP(this.one.a.x, this.one.c.y - gap);
				this.thr.setP(this.one.a.x, this.two.c.y - gap);
				this.for.setP(this.one.a.x, this.thr.c.y - gap);
			
			}
		}
		//this.drawTuxing();
	}
	
	//图形移动实现
	this.act = function(x,y,step){
		bianNum = step + this.bianhuaMax + 1;
		goNUM = x/10;
	
		
		msecTmp++;
		if(msecTmp >= goNUM / bianNum){
			gaibianTmp++;
			msecTmp = 0;
		}
		
		this.draw.clear();
		if(this.one.a.x <= x)
			this.setXY(10,0);
	
		if(this.one.a.x >= x && this.one.a.y >= y)
			this.setXY(0,-10);
		
		if(gaibianTmp == 1){
			if(this.gaibian == 0)
				nextBian++;
				
			if(nextBian == 1){
				this.bianhuan(10);
			}
			else{
				this.bianhuan(step);
			}
			
			gaibianTmp=0;
		}
			
		this.drawTuxing();
	}
	
	//设置图形的坐标
	this.setXY = function(x,y){
		this.two.setP(this.two.a.x + x, this.two.a.y + y);
		this.thr.setP(this.thr.a.x + x, this.thr.a.y + y);
		this.for.setP(this.for.a.x + x, this.for.a.y + y);
		this.one.setP(this.one.a.x + x, this.one.a.y + y);
	}
	
	//设置图形的颜色
	this.setColor = function(){
		this.col = colList[GetRandomNum()];
		this.drawTuxing();
	}
	
	//图形组成心后，设置心的颜色
	this.setRedColor = function(){
		this.col = redCpl[redIndex];
		this.drawTuxing();
	}
}

//T方块类
var tzi = function(x,y){
	this.one = new squ(x,y);
	this.two = new squ(this.one.c.x , this.one.c.y - gap);
	this.thr = new squ(this.one.b.x + gap, this.one.b.y);
	this.for = new squ(this.thr.b.x + gap, this.thr.b.y);
	this.col = colList[GetRandomNum()];
	this.draw = new cc.DrawNode();
	this.gaibian = 0;
	this.type = 1;
	this.bianhuaMax = 4;
	
	var bianNum = 0;
	var goNUM = 0;
		
	var gaibianTmp = 0;
	var msecTmp = 0;
	var nextBian = 0;
	
	
	this.drawTuxing = function(){
        //fill
		this.draw.drawRect(this.one.a, this.one.d, this.col, 1, this.col);
		this.draw.drawRect(this.two.a, this.two.d, this.col, 1, this.col);
		this.draw.drawRect(this.thr.a, this.thr.d, this.col, 1, this.col);
		this.draw.drawRect(this.for.a, this.for.d, this.col, 1, this.col);
    }
	
	this.setMode = function(type){
		if(type == 1){
			this.type = 1;
		}else{
			this.two.setP(this.one.a.x , this.one.a.y + gap + line);
			this.type = 2;
		}
	}
	
	this.bianhuan = function(step){
		//this.draw.clear();
		if(this.gaibian != step){
			this.gaibian = (this.gaibian + 1)%4;
			//fill
			switch(this.gaibian){
				case 0:
					if(this.type == 1){
						this.two.setP(this.one.c.x , this.one.c.y - gap);
					}else{
						this.two.setP(this.one.a.x , this.one.a.y + gap + line);
					}
					this.thr.setP(this.one.b.x + gap, this.one.b.y);
					this.for.setP(this.thr.b.x + gap, this.thr.b.y);
				break;
				case 1:	
					if(this.type == 1){
						this.two.setP(this.one.a.x - gap - line, this.one.a.y);
					}else{
						this.two.setP(this.one.a.x + gap + line, this.one.a.y);
					}
					
					this.thr.setP(this.one.a.x, this.one.a.y - line - gap);
					this.for.setP(this.thr.a.x, this.thr.a.y - line - gap);
				break;
				case 2:
					if(this.type == 1){
						this.two.setP(this.one.a.x , this.one.a.y + gap + line);
					}else{
						this.two.setP(this.one.a.x , this.one.a.y - gap - line);
					}
					
					this.thr.setP(this.one.a.x - gap - line, this.one.a.y);
					this.for.setP(this.thr.a.x - gap - line, this.thr.a.y);
				break;
				case 3:
					if(this.type == 1){
						this.two.setP(this.one.a.x + gap + line, this.one.a.y);
					}else{
						this.two.setP(this.one.a.x - gap - line, this.one.a.y);
					}
					
					this.thr.setP(this.one.a.x, this.one.a.y + line + gap);
					this.for.setP(this.thr.a.x, this.thr.a.y + line + gap);
				break;
			
			}
		}
		//this.drawTuxing();
	}
	
	this.act = function(x,y,step){
		bianNum = step + this.bianhuaMax + 1;
		goNUM = x/10;
	
		
		msecTmp++;
		if(msecTmp >= goNUM / bianNum){
			gaibianTmp++;
			msecTmp = 0;
		}
		
		this.draw.clear();
		if(this.one.a.x <= x)
			this.setXY(10,0);
	
		if(this.one.a.x >= x && this.one.a.y >= y)
			this.setXY(0,-10);
		
		if(gaibianTmp == 1){
			if(this.gaibian == 0)
				nextBian++;
				
			if(nextBian == 1){
				this.bianhuan(10);
			}
			else{
				this.bianhuan(step);
			}
			
			gaibianTmp=0;
		}
			
		this.drawTuxing();
	}
	
	
	this.setXY = function(x,y){
		this.two.setP(this.two.a.x + x, this.two.a.y + y);
		this.thr.setP(this.thr.a.x + x, this.thr.a.y + y);
		this.for.setP(this.for.a.x + x, this.for.a.y + y);
		this.one.setP(this.one.a.x + x, this.one.a.y + y);
	}
	
	this.setColor = function(){
		this.col = colList[GetRandomNum()];
		this.drawTuxing();
	}
	
	this.setRedColor = function(){
		this.col = redCpl[redIndex];
		this.drawTuxing();
	}
}

//Z方块类
var zzi = function(x,y){
	this.one = new squ(x,y);
	this.two = new squ(this.one.b.x + gap, y);
	this.thr = new squ(this.two.a.x, this.two.a.y + line + gap);
	this.for = new squ(this.thr.b.x + gap, this.thr.b.y);
	this.col = colList[GetRandomNum()];
	this.draw = new cc.DrawNode();
	this.gaibian = 0;
	this.type = 1;
	this.bianhuaMax = 2;
	
	var bianNum = 0;
	var goNUM = 0;
		
	var gaibianTmp = 0;
	var msecTmp = 0;
	var nextBian = 0;
	
	this.setMode = function(type){
		if(type == 1){
			this.type = 1;
		}else{
			this.one.setP(this.two.a.x, this.two.a.y);
			this.two.setP(this.thr.a.x, this.thr.a.y);
			this.thr.setP(this.one.a.x, this.one.a.y);
			this.one.setP(this.two.a.x - gap - line, this.two.a.y);
			this.for.setP(this.thr.b.x + gap, this.thr.b.y);
			this.type = 2;
		}
	}
	
	this.drawTuxing = function(){
        //fill
		this.draw.drawRect(this.one.a, this.one.d, this.col, 1, this.col);
		this.draw.drawRect(this.two.a, this.two.d, this.col, 1, this.col);
		this.draw.drawRect(this.thr.a, this.thr.d, this.col, 1, this.col);
		this.draw.drawRect(this.for.a, this.for.d, this.col, 1, this.col);
    }
	
	this.bianhuan = function(step){
		//this.draw.clear();
		if(this.gaibian != step){
			this.gaibian = (this.gaibian + 1)%2;
			if(this.type == 1){
				if(this.gaibian == 0){
					this.for.setP(this.thr.a.x, this.thr.a.y);
					this.thr.setP(this.two.a.x, this.two.a.y);
					this.two.setP(this.thr.c.x, this.thr.c.y - gap);
					this.one.setP(this.two.a.x - gap - line, this.two.a.y);
					
				}else{
					this.one.setP(this.thr.a.x, this.thr.a.y + gap + line);
					this.two.setP(this.thr.a.x, this.thr.a.y);
					this.thr.setP(this.for.a.x, this.for.a.y);
					this.for.setP(this.thr.a.x, this.thr.c.y - gap);
					
					
				}
			}else{
				if(this.gaibian == 0){
					this.one.setP(this.thr.a.x - gap - line,this.thr.a.y);
					this.two.setP(this.thr.a.x, this.thr.a.y);
					this.thr.setP(this.for.a.x, this.for.a.y);
					this.for.setP(this.thr.b.x + gap, this.thr.a.y);
				}else{
					this.for.setP(this.thr.a.x, this.thr.a.y);
					this.thr.setP(this.two.a.x, this.two.a.y);
					this.two.setP(this.thr.b.x + gap,this.thr.b.y);
					this.one.setP(this.two.a.x , this.two.a.y + gap + line);
				}
			}
		}
		//this.drawTuxing();
	}
	
	this.act = function(x,y,step){
		bianNum = step + this.bianhuaMax + 1;
		goNUM = x/10;
	
		
		msecTmp++;
		if(msecTmp >= goNUM / bianNum){
			gaibianTmp++;
			msecTmp = 0;
		}
		
		this.draw.clear();
		if(this.one.a.x <= x)
			this.setXY(10,0);
	
		if(this.one.a.x >= x && this.one.a.y >= y)
			this.setXY(0,-10);
		
		if(gaibianTmp == 1){
			if(this.gaibian == 0)
				nextBian++;
				
			if(nextBian == 1){
				this.bianhuan(10);
			}
			else{
				this.bianhuan(step);
			}
			
			gaibianTmp=0;
		}
			
		this.drawTuxing();
	}
	
	
	this.setXY = function(x,y){
		this.two.setP(this.two.a.x + x, this.two.a.y + y);
		this.thr.setP(this.thr.a.x + x, this.thr.a.y + y);
		this.for.setP(this.for.a.x + x, this.for.a.y + y);
		this.one.setP(this.one.a.x + x, this.one.a.y + y);
	}
	
	this.setColor = function(){
		this.col = colList[GetRandomNum()];
		this.drawTuxing();
	}
	
	this.setRedColor = function(){
		this.col = redCpl[redIndex];
		this.drawTuxing();
	}
}

//土方块类
var tuzi = function(x,y){
	this.two = new squ(x,y);
	this.one = new squ(this.two.b.x + gap, y);
	this.thr = new squ(this.one.a.x, this.one.a.y + line + gap);
	this.for = new squ(this.thr.b.x + gap, y);
	this.fiv = new squ(this.one.c.x, this.one.c.y - gap);
	
	this.col = colList[GetRandomNum()];
	this.draw = new cc.DrawNode();
	this.gaibian = 0;
	this.bianhuaMax = 4;
	
	var bianNum = 0;
	var goNUM = 0;
		
	var gaibianTmp = 0;
	var msecTmp = 0;
	var nextBian = 0;
	
	
	this.drawTuxing = function(){
        //fill
		this.draw.drawRect(this.one.a, this.one.d, this.col, 1, this.col);
		switch(this.gaibian){
			case 0:
				this.draw.drawRect(this.two.a, this.two.d, this.col, 1, this.col);
				this.draw.drawRect(this.thr.a, this.thr.d, this.col, 1, this.col);
				this.draw.drawRect(this.for.a, this.for.d, this.col, 1, this.col);
			break;
			case 1:	
				this.draw.drawRect(this.fiv.a, this.fiv.d, this.col, 1, this.col);
				this.draw.drawRect(this.thr.a, this.thr.d, this.col, 1, this.col);
				this.draw.drawRect(this.for.a, this.for.d, this.col, 1, this.col);
			break;
			case 2:
				this.draw.drawRect(this.two.a, this.two.d, this.col, 1, this.col);
				this.draw.drawRect(this.fiv.a, this.fiv.d, this.col, 1, this.col);
				this.draw.drawRect(this.for.a, this.for.d, this.col, 1, this.col);
			break;
			case 3:
				this.draw.drawRect(this.two.a, this.two.d, this.col, 1, this.col);
				this.draw.drawRect(this.thr.a, this.thr.d, this.col, 1, this.col);
				this.draw.drawRect(this.fiv.a, this.fiv.d, this.col, 1, this.col);
			break;
		}
    }
	
     this.setMode = function(type){
	
	}
	
	this.bianhuan = function(step){
		//this.draw.clear();
		
		if(this.gaibian != step)
			this.gaibian = (this.gaibian + 1)%4;
		
		//this.drawTuxing();
	}
	
	this.act = function(x,y,step){
		bianNum = step + this.bianhuaMax + 1;
		goNUM = x/10;
	
		
		msecTmp++;
		if(msecTmp >= goNUM / bianNum){
			gaibianTmp++;
			msecTmp = 0;
		}
		
		this.draw.clear();
		if(this.one.a.x <= x)
			this.setXY(10,0);
	
		if(this.one.a.x >= x && this.one.a.y >= y)
			this.setXY(0,-10);
		
		if(gaibianTmp == 1){
			if(this.gaibian == 0)
				nextBian++;
				
			if(nextBian == 1){
				this.bianhuan(10);
			}
			else{
				this.bianhuan(step);
			}
			
			gaibianTmp=0;
		}
			
		this.drawTuxing();
	}
	
	
	this.setXY = function(x,y){
		this.two.setP(this.two.a.x + x, this.two.a.y + y);
		this.thr.setP(this.thr.a.x + x, this.thr.a.y + y);
		this.for.setP(this.for.a.x + x, this.for.a.y + y);
		this.one.setP(this.one.a.x + x, this.one.a.y + y);
		this.fiv.setP(this.fiv.a.x + x, this.fiv.a.y + y);
	}
	
	this.setColor = function(){
		this.col = colList[GetRandomNum()];
		this.drawTuxing();
	}
	
	this.setRedColor = function(){
		this.col = redCpl[redIndex];
		this.drawTuxing();
	}
}

//田方块类
var tianzi = function(x,y){
	this.one = new squ(x,y);
	this.two = new squ(this.one.b.x + gap, this.one.b.y);
	this.thr = new squ(this.one.c.x, this.one.c.y - gap);
	this.for = new squ(this.thr.b.x + gap, this.thr.b.y);
	this.col = colList[GetRandomNum()];
	this.draw = new cc.DrawNode();
	this.gaibian = 0;
	this.bianhuaMax = 0;
	var bianNum = 0;
	var goNUM = 0;
		
	var gaibianTmp = 0;
	var msecTmp = 0;
	var nextBian = 0;
	
	this.drawTuxing = function(){
        //fill
		this.draw.drawRect(this.one.a, this.one.d, this.col, 1, this.col);
		this.draw.drawRect(this.two.a, this.two.d, this.col, 1, this.col);
		this.draw.drawRect(this.thr.a, this.thr.d, this.col, 1, this.col);
		this.draw.drawRect(this.for.a, this.for.d, this.col, 1, this.col);
    }
	
     this.setMode = function(type){
	
	}
	
	this.act = function(x,y,step){
		bianNum = step + this.bianhuaMax + 1;
		goNUM = x/10;
	
		
		msecTmp++;
		if(msecTmp >= goNUM / bianNum){
			gaibianTmp++;
			msecTmp = 0;
		}
		
		this.draw.clear();
		if(this.one.a.x <= x)
			this.setXY(10,0);
	
		if(this.one.a.x >= x && this.one.a.y >= y)
			this.setXY(0,-10);
		
		if(gaibianTmp == 1){
			if(this.gaibian == 0)
				nextBian++;
				
			if(nextBian == 1){
				this.bianhuan(10);
			}
			else{
				this.bianhuan(step);
			}
			
			gaibianTmp=0;
		}
			
		this.drawTuxing();
	}
	
	
	this.bianhuan = function(step){
	
	}
	
	this.setXY = function(x,y){
		this.two.setP(this.two.a.x + x, this.two.a.y + y);
		this.thr.setP(this.thr.a.x + x, this.thr.a.y + y);
		this.for.setP(this.for.a.x + x, this.for.a.y + y);
		this.one.setP(this.one.a.x + x, this.one.a.y + y);
	}
	
	this.setColor = function(){
		this.col = colList[GetRandomNum()];
		this.drawTuxing();
	}
	
	this.setRedColor = function(){
		this.col = redCpl[redIndex];
		this.drawTuxing();
	}
}

//cocos2d引擎动作开始
window.onload = function(){
	var msecTmp = 0;
	var secTmp = 0;
	
    cc.game.onStart = function(){
		//构建场景
        var MyScene = cc.Scene.extend({
		
		  ctor:function () {
			this._super();
			this.schedule(this.updateOneSec,0.05);
		  },
          onEnter:function () {
            this._super();
			
			var winSize = cc.director.getWinSize();
			//构建层，并加入精灵
			xin.push(new stick(srcX,srcY));
			xin.push(new zzi(srcX,srcY));
			xin.push(new tuzi(srcX,srcY));
			xin.push(new tuzi(srcX,srcY));
			xin.push(new tuzi(srcX,srcY));
			xin.push(new tuzi(srcX,srcY));
			xin.push(new tuzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new stick(srcX,srcY));
			xin.push(new tianzi(srcX,srcY));
			xin.push(new tuzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new zzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new stick(srcX,srcY));
			xin.push(new zzi(srcX,srcY));
			xin.push(new stick(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new tuzi(srcX,srcY));
			xin.push(new zzi(srcX,srcY));
			xin.push(new tzi(srcX,srcY));
			xin.push(new zzi(srcX,srcY));
			
			for(var i = 0; i < 26; i++){
				this.addChild(xin[i].draw, 10);
			}
			
			xin[step].setMode(xinMode[step]);
			
          },
		  
		  //时间回调，实现动画
		  updateOneSec:function () {
	
		  	if(step < 26){
		  		if(xin[step].one.a.x >= xinP[step].x && xin[step].one.a.y <= xinP[step].y){
		  	
		  			step++;
		  			if(step < 26){
		  				xin[step].setMode(xinMode[step]);
		  			}
		  		}
		  		if(step < 26){
		  			xin[step].act(xinP[step].x, xinP[step].y, xinType[step]);
		  		}
		  	}
		  	else{
		  		msecTmp++;
		  		if(msecTmp >= 10){
		  			if(secTmp <=  5){
		  				for(var j = 0; j < step; j++){
		  					xin[j].setColor();
		  				}
		  				secTmp++;
		  			}else{
		  				for(var j = 0; j < step; j++){
		  					xin[j].setRedColor();
		  				}
		  				
		  				redIndex=(redIndex+1)%7;
		  			}
		  			msecTmp=0;
		  		}
		  	}
			
		  }
        });
		//绘制动画
        cc.director.runScene(new MyScene());
    };
    cc.game.run("gameCanvas");
};