var uiLayout = function(){
	var $editor = $('#svgEditor'),
		panelDragged = null,
		panelOnTopZ = null;
	
	$('.panel').each(function(){
		
		var $this = $(this),
			
			$panelBase = $this.find('.panelBase'),
			$panelIcon = $this.find('.panelIcon'),
			wIcon = $panelIcon.outerWidth(),
			w = $panelBase.width(),
			h = $panelBase.height(),
			posX = $this.offset().left,
			posY = $this.offset().top,
			dx = 0,
			dy = 0,
			
			collapsed = false,
			sizing = false,
			setIconPosition = function(){
				if(collapsed){
					var l,r,t,b;						
					if(posX > ($editor.width()/2)){
						l = 'auto';r = '-'+ (w+wIcon) + 'px';
					}else{
						l = '-'+wIcon+'px';r = 'auto';
					}
					
					if(posY > ($editor.height()/2)){
						t = 'auto';b = '-'+ h + 'px';
					}else{
						t = '0';b = 'auto';
					}
					$panelIcon.css({'left' : l, 'right':r,'top':t,'bottom':b});
				}				
			};
		
		
		$this.mousedown(function(event){
			if(panelOnTopZ != null){panelOnTopZ.removeClass('onTopZ');}
			panelOnTopZ = $this.addClass('onTopZ');
			return false;
		});	
		
		
		$this.find('.sizer').mousedown(function(event){			
			sizing = true;			
			dx = event.pageX - (posX + $panelBase.width());
			dy = event.pageY - (posY + $panelBase.height());
			return false;		
		});	
		
		
		$this.find('.dragger').mousedown(function(event){		
			panelDragged = $this;			
			dx = event.pageX - posX;
			dy = event.pageY - posY;
			return false;
		});		
		$('body').mousemove(function(event){			
			if(panelDragged != null){				
				posX = event.pageX - dx;
				posY = event.pageY - dy;
				panelDragged.css({
					'left': posX + 'px',
					'top': posY + 'px'
				});
				setIconPosition();	
			}			
			if(sizing){
				w = event.pageX - dx - posX;
				h = event.pageY - dy - posY;					
				$panelBase.width(w).height(h);
				setIconPosition();
			}
			return false;	
		}).mouseup(function(){
			if(panelDragged != null){
				panelDragged = null;	
			}
			sizing = false;
			return false;
		});
		
		
		if($this.hasClass('collapsed')){collapsed = true;setIconPosition();}
		
		$this.find('.collapser').click(function(){
			if(!collapsed){
				$this.addClass('collapsed');
				collapsed = true;
				setIconPosition();
			}else{
				$this.removeClass('collapsed');
				collapsed = false;
			}
		});
		
		$this.find('.close').click(function(){
			$this.hide();
		});
		
		
		
	});
};
$('document').ready(uiLayout);