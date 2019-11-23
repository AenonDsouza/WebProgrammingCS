reverse: function(){
   if (this.speed < this.maxSpeed){
			if (this.speed < 0){
				this.speed *= this.speedDecay;
			} else if (this.speed === 0){
				this.speed = 0.4;
			} else {
				this.speed *= this.acceleration;
        this.speed *= this.backSpeed;
			}
		},
 }; 
