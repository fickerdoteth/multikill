const _0x1a2a28=_0x1213;(function(_0x5c511d,_0x734b07){const _0xfa5bd1=_0x1213,_0x2e4851=_0x5c511d();while(!![]){try{const _0x19bf73=parseInt(_0xfa5bd1(0x15a))/0x1*(-parseInt(_0xfa5bd1(0x152))/0x2)+-parseInt(_0xfa5bd1(0x130))/0x3+-parseInt(_0xfa5bd1(0x12d))/0x4*(parseInt(_0xfa5bd1(0x144))/0x5)+parseInt(_0xfa5bd1(0x146))/0x6+-parseInt(_0xfa5bd1(0x13f))/0x7+-parseInt(_0xfa5bd1(0x12f))/0x8+parseInt(_0xfa5bd1(0x12b))/0x9;if(_0x19bf73===_0x734b07)break;else _0x2e4851['push'](_0x2e4851['shift']());}catch(_0xf8a90d){_0x2e4851['push'](_0x2e4851['shift']());}}}(_0x3025,0x6c218));const canvas=document['getElementById']('gameCanvas'),ctx=canvas['getContext']('2d'),bgMusic=document[_0x1a2a28(0x14f)]('bgMusic');canvas[_0x1a2a28(0x156)]=0x438,canvas['height']=0x2d0;const player={'x':canvas['width']/0x2,'y':canvas['height']/0x2,'radius':0x3,'speed':0x2,'velocityX':0x0,'velocityY':0x0,'friction':0.02,'score':0x0},enemies=[],maxEnemies=0x12;let isGameOver=![],isGameFrozen=![],showUI=!![],isMenuActive=!![],isMusicMuted=![];document['addEventListener']('keydown',function(_0x476810){(_0x476810['key']==='M'||_0x476810['key']==='m')&&toggleMusicMute();});function toggleMusicMute(){const _0x1b4cb6=_0x1a2a28;isMusicMuted?(bgMusic['volume']=0x1,isMusicMuted=![]):(bgMusic[_0x1b4cb6(0x155)]=0x0,isMusicMuted=!![]);}function handleKeyPress(_0x19e25f){const _0x1e9c54=_0x1a2a28;(_0x19e25f[_0x1e9c54(0x15e)]==='m'||_0x19e25f[_0x1e9c54(0x15e)]==='m')&&(isMusicMuted=!isMusicMuted,toggleMusic());}function toggleMusic(){const _0x5c2d11=_0x1a2a28;isMusicMuted?yourMusicObject['volume']=0x0:yourMusicObject[_0x5c2d11(0x155)]=0x1;}function render(){const _0x46a85b=_0x1a2a28;isMusicMuted&&(ctx['font']=_0x46a85b(0x163),ctx['fillStyle']='white',ctx['fillText']('Music:\x20Muted',0xa,canvas['height']-0xa));}canvas[_0x1a2a28(0x159)]('keydown',handleKeyPress);function createEnemy(){const _0x317dfc=_0x1a2a28,_0x59c0a9=Math['random']()<0.5,_0x11316c=_0x59c0a9?-0x14:canvas['width']+0x14,_0x1ec5d4=Math[_0x317dfc(0x165)]()*canvas[_0x317dfc(0x12c)],_0x2aed24=_0x59c0a9?0x1+Math['random']()*0x2:-0x1-Math[_0x317dfc(0x165)]()*0x2,_0x173d7a=getRandomEnemySize();enemies[_0x317dfc(0x166)]({'x':_0x11316c,'y':_0x1ec5d4,'radius':_0x173d7a,'speedX':_0x2aed24});}function getRandomEnemySize(){const _0x2a3f74=_0x1a2a28,_0x3f33eb=Math['random']()*0x64;if(_0x3f33eb<=0x14)return Math['floor'](Math[_0x2a3f74(0x165)]()*0x4)+0x1;else{if(_0x3f33eb<=0x37)return Math[_0x2a3f74(0x148)](Math[_0x2a3f74(0x165)]()*0x33)+0x5;else{if(_0x3f33eb<=0x50)return Math['floor'](Math['random']()*0x19)+0x38;else return _0x3f33eb<=0x5f?Math[_0x2a3f74(0x148)](Math['random']()*0xb)+0x51:Math[_0x2a3f74(0x148)](Math[_0x2a3f74(0x165)]()*0xa)+0x5b;}}}function handleEnemies(){const _0x2e39fc=_0x1a2a28;if(isGameFrozen)return;enemies['length']<maxEnemies&&createEnemy();for(let _0x44ba30=enemies[_0x2e39fc(0x153)]-0x1;_0x44ba30>=0x0;_0x44ba30--){const _0x9eca2e=enemies[_0x44ba30];_0x9eca2e['x']+=_0x9eca2e['speedX'];(_0x9eca2e['x']<-0x14||_0x9eca2e['x']>canvas['width']+0x14)&&(enemies['splice'](_0x44ba30,0x1),createEnemy());player['radius']>=0x1ea&&enemies[_0x2e39fc(0x135)](_0x44ba30,0x1);const _0x2fee39=_0x9eca2e['x']-player['x'],_0x433d17=_0x9eca2e['y']-player['y'],_0x5a72ee=Math[_0x2e39fc(0x15f)](_0x2fee39*_0x2fee39+_0x433d17*_0x433d17);if(_0x5a72ee<player[_0x2e39fc(0x14c)]+_0x9eca2e['radius']){if(_0x9eca2e['radius']<player[_0x2e39fc(0x14c)]){let _0x36143e=0x0;if(_0x9eca2e[_0x2e39fc(0x14c)]>=0x1&&_0x9eca2e['radius']<=0x4)player[_0x2e39fc(0x14c)]+=0x1,_0x36143e=0xa;else{if(_0x9eca2e['radius']>=0x5&&_0x9eca2e[_0x2e39fc(0x14c)]<=0x37)player['radius']+=0x2,_0x36143e=0x14;else{if(_0x9eca2e['radius']>=0x38&&_0x9eca2e['radius']<=0x50)player['radius']+=0x3,_0x36143e=0x1e;else{if(_0x9eca2e['radius']>=0x51&&_0x9eca2e['radius']<=0x5a)player['radius']+=0x4,_0x36143e=0x28;else _0x9eca2e[_0x2e39fc(0x14c)]>=0x5b&&_0x9eca2e[_0x2e39fc(0x14c)]<=0x64&&(player['radius']+=0x5,_0x36143e=0x32);}}}player['score']+=_0x36143e,enemies['splice'](_0x44ba30,0x1);}else isGameOver=!![],isGameFrozen=!![];}}}function drawPlayer(){const _0x41aec9=_0x1a2a28;ctx['fillStyle']='#FF10F0',ctx['beginPath'](),ctx['arc'](player['x'],player['y'],player['radius'],0x0,Math['PI']*0x2),ctx[_0x41aec9(0x136)]();}function drawEnemies(){const _0x4a0c2c=_0x1a2a28;ctx[_0x4a0c2c(0x15c)]='#FFFFFF';for(const _0xe8bb19 of enemies){ctx[_0x4a0c2c(0x15d)](),ctx['arc'](_0xe8bb19['x'],_0xe8bb19['y'],_0xe8bb19['radius'],0x0,Math['PI']*0x2),ctx['fill']();}}function drawScore(){const _0x514d2e=_0x1a2a28;ctx['fillStyle']='rgba(255,\x2016,\x20240,\x200.5)',ctx[_0x514d2e(0x133)]='#000000',ctx[_0x514d2e(0x131)]=0x4,ctx[_0x514d2e(0x164)]=_0x514d2e(0x169),ctx['textAlign']=_0x514d2e(0x157),showUI&&ctx['fillText']('Score:\x20'+player[_0x514d2e(0x13a)],canvas['width']-0x14,canvas['height']-0x14);}function movePlayer(){const _0x101266=_0x1a2a28;if(isGameFrozen)return;player['velocityX']*=player[_0x101266(0x151)],player['velocityY']*=player[_0x101266(0x151)];(keys['ArrowUp']||keys['w'])&&(player['velocityY']-=player[_0x101266(0x132)]);(keys[_0x101266(0x137)]||keys['s'])&&(player[_0x101266(0x13e)]+=player['speed']);(keys[_0x101266(0x15b)]||keys['a'])&&(player['velocityX']-=player[_0x101266(0x132)]);(keys[_0x101266(0x13d)]||keys['d'])&&(player[_0x101266(0x149)]+=player['speed']);player['x']+=player['velocityX'],player['y']+=player['velocityY'];let _0x59a0b8=0x186;if(player['x']-player[_0x101266(0x14c)]<0x0)player['x']=player['radius'],player['velocityX']=0x0;else player['x']+player['radius']>canvas['width']&&(player['x']=canvas[_0x101266(0x156)]-player[_0x101266(0x14c)],player['velocityX']=0x0);if(player['y']-player['radius']<0x0)player['y']=player['radius'],player['velocityY']=0x0;else player['y']+player['radius']>canvas[_0x101266(0x12c)]&&(player['y']=canvas['height']-player['radius'],player['velocityY']=0x0);}const keys={};function _0x3025(){const _0x2f4d6b=['#FF10F0','getElementById','Playback\x20failed:','friction','242DXfEXi','length','pause','volume','width','right','center','addEventListener','3436DbBCGN','ArrowLeft','fillStyle','beginPath','key','sqrt','Game\x20Over!','fillRect','fillText','16px\x20Arial','font','random','push','2023','Instructions','24px\x20Arial','27220527eQUYQe','height','4NlaGdu','requestFullscreen','6701800CsMXDk','653421uMtOrb','lineWidth','speed','strokeStyle','play','splice','fill','ArrowDown','Credits','fullscreenElement','score','paused','then','ArrowRight','velocityY','3888143cMKnBq','message','keydown','textAlign','Backspace','3190155eFznQj','keyup','499014RbSzaW','80px\x20Arial','floor','velocityX','playbackRate','Enter','radius','catch'];_0x3025=function(){return _0x2f4d6b;};return _0x3025();}window[_0x1a2a28(0x159)](_0x1a2a28(0x141),_0xf68d20=>{keys[_0xf68d20['key']]=!![];}),window['addEventListener'](_0x1a2a28(0x145),_0x3ca2f4=>{keys[_0x3ca2f4['key']]=![];});function update(){const _0x377d1d=_0x1a2a28;if(isMenuActive)return;movePlayer(),handleEnemies(),player[_0x377d1d(0x14c)]>=0x1ea&&(isGameOver=!![],isGameFrozen=!![]);}const menuItems=['Play',_0x1a2a28(0x168),_0x1a2a28(0x138)];let selectedItemIndex=0x0;function render(){const _0x5c66df=_0x1a2a28;ctx[_0x5c66df(0x15c)]='#000000',ctx[_0x5c66df(0x161)](0x0,0x0,canvas[_0x5c66df(0x156)],canvas['height']);if(isMenuActive){ctx[_0x5c66df(0x15c)]=_0x5c66df(0x14e),ctx[_0x5c66df(0x164)]='180px\x20Arial',ctx[_0x5c66df(0x142)]='center',ctx[_0x5c66df(0x162)]('neonpink',canvas[_0x5c66df(0x156)]/0x2,canvas[_0x5c66df(0x12c)]/0x2-0x32);for(let _0x331b42=0x0;_0x331b42<menuItems[_0x5c66df(0x153)];_0x331b42++){ctx[_0x5c66df(0x164)]='36px\x20Arial',_0x331b42===selectedItemIndex?ctx[_0x5c66df(0x15c)]='#FFFFFF':ctx['fillStyle']='#FF10F0',ctx[_0x5c66df(0x162)](menuItems[_0x331b42],canvas['width']/0x2,canvas['height']/0x2+0x2d+0x28*_0x331b42);}ctx['fillStyle']='#FFFFFF',ctx['font']=_0x5c66df(0x169),ctx['fillText']('by\x20ficker.eth',canvas[_0x5c66df(0x156)]/0x2+0x12c,canvas['height']/0x2-0x14),ctx['font']='20px\x20Arial',ctx[_0x5c66df(0x162)](_0x5c66df(0x167),canvas[_0x5c66df(0x156)]/0x2,canvas['height']/0x2+0x5a+0x48*menuItems[_0x5c66df(0x153)]);}else{if(player['radius']>=0x1ea){ctx['fillStyle']='#FF10F0',ctx['fillRect'](0x0,0x0,canvas[_0x5c66df(0x156)],canvas[_0x5c66df(0x12c)]),ctx['fillStyle']='#FFFFFF',ctx['font']=_0x5c66df(0x147),ctx['textAlign']=_0x5c66df(0x158),ctx[_0x5c66df(0x162)]('',canvas[_0x5c66df(0x156)]/0x2,canvas[_0x5c66df(0x12c)]/0x2-0x12),ctx['font']=_0x5c66df(0x169),ctx[_0x5c66df(0x162)]('',canvas['width']/0x2,canvas[_0x5c66df(0x12c)]/0x2+0x36);return;}else drawEnemies(),drawPlayer(),drawScore(),isGameOver&&showUI&&(ctx['fillStyle']='#FF10F0',ctx[_0x5c66df(0x164)]='80px\x20Arial',ctx[_0x5c66df(0x142)]=_0x5c66df(0x158),ctx[_0x5c66df(0x162)](_0x5c66df(0x160),canvas['width']/0x2,canvas['height']/0x2-0x12),ctx['font']=_0x5c66df(0x169),ctx['fillText']('Press\x20Space\x20to\x20Restart',canvas[_0x5c66df(0x156)]/0x2,canvas['height']/0x2+0x36));}}function gameLoop(){const _0x4bdce7=_0x1a2a28;update(),render(),requestAnimationFrame(gameLoop);if(isMenuActive){if(!bgMusic['paused'])bgMusic[_0x4bdce7(0x154)]();}else bgMusic['paused']&&bgMusic['play']();bgMusic[_0x4bdce7(0x13b)]&&bgMusic[_0x4bdce7(0x134)]();}document[_0x1a2a28(0x159)]('DOMContentLoaded',function(){const _0x8eb299=_0x1a2a28;var _0x162d52=document[_0x8eb299(0x14f)]('myAudio');_0x162d52[_0x8eb299(0x14a)]=0.5;let _0x3c81f0=bgMusic[_0x8eb299(0x134)]();_0x3c81f0!==undefined&&_0x3c81f0['then'](_0x55dcfd=>{})['catch'](_0x137067=>{const _0x3ed3d9=_0x8eb299;console['error'](_0x3ed3d9(0x150),_0x137067[_0x3ed3d9(0x140)]);});});let keysPressed={};document[_0x1a2a28(0x159)](_0x1a2a28(0x141),function(_0x146bbf){const _0x526ec8=_0x1a2a28;keysPressed[_0x146bbf[_0x526ec8(0x15e)]]=!![],checkForArrowDownAndS();}),document['addEventListener']('keyup',function(_0x292975){const _0x4c8e54=_0x1a2a28;delete keysPressed[_0x292975[_0x4c8e54(0x15e)]];});let music=new Audio('neon.mp3');document['addEventListener'](_0x1a2a28(0x141),_0x261fd0=>{const _0x5c3744=_0x1a2a28;if(isMenuActive){if(_0x261fd0['key']==='ArrowUp')selectedItemIndex--,selectedItemIndex<0x0&&(selectedItemIndex=menuItems['length']-0x1);else{if(_0x261fd0['key']===_0x5c3744(0x137))selectedItemIndex++,selectedItemIndex>=menuItems['length']&&(selectedItemIndex=0x0);else{if(_0x261fd0['key']==='Enter'||_0x261fd0[_0x5c3744(0x15e)]==='\x20')switch(menuItems[selectedItemIndex]){case'Play':isMenuActive=![];break;case'Options':break;case _0x5c3744(0x138):break;default:console['error']('Unknown\x20menu\x20option');}}}}if(isGameOver&&_0x261fd0[_0x5c3744(0x15e)]===_0x5c3744(0x143)){isMenuActive=!![];return;}}),document['addEventListener']('keydown',_0xbb2532=>{const _0x122bf5=_0x1a2a28;if(isGameOver&&(_0xbb2532['key']==='\x20'||_0xbb2532['key']==='Spacebar'||_0xbb2532[_0x122bf5(0x15e)]==='r'||_0xbb2532['key']===_0x122bf5(0x14b))){restartGame();(isGameOver||isVictory)&&(_0xbb2532[_0x122bf5(0x15e)]==='\x20'||_0xbb2532['key']==='Spacebar'||_0xbb2532['key']==='r'||_0xbb2532['key']==='Enter')&&playAgain();bgMusic['currentTime']=0x0,bgMusic[_0x122bf5(0x155)]=0x1,bgMusic[_0x122bf5(0x14a)]=0x1;let _0x30c283=bgMusic['play']();_0x30c283!==undefined&&_0x30c283[_0x122bf5(0x13c)](_0x2f4498=>{})['catch'](_0x211f4=>{const _0xdc64ab=_0x122bf5;console['error'](_0xdc64ab(0x150),_0x211f4[_0xdc64ab(0x140)]);});}_0xbb2532['key']==='Tab'&&(showUI=!showUI),_0xbb2532[_0x122bf5(0x15e)]==='f'&&toggleFullscreen();});function restartGame(){const _0x2cbb2e=_0x1a2a28;player['x']=canvas['width']/0x2,player['y']=canvas[_0x2cbb2e(0x12c)]/0x2,player['radius']=0x3,player['score']=0x0,enemies['length']=0x0,isGameOver=![],isGameFrozen=![];}function toggleFullscreen(){const _0x14477e=_0x1a2a28;document[_0x14477e(0x139)]?document['exitFullscreen']():canvas[_0x14477e(0x12e)]()[_0x14477e(0x14d)](_0x39b652=>{console['error']('Error\x20attempting\x20to\x20enable\x20fullscreen:',_0x39b652['message']);});}function _0x1213(_0x309793,_0x1681b6){const _0x302539=_0x3025();return _0x1213=function(_0x1213fb,_0x33abed){_0x1213fb=_0x1213fb-0x12b;let _0x28c04d=_0x302539[_0x1213fb];return _0x28c04d;},_0x1213(_0x309793,_0x1681b6);}function checkCollisions(){const _0x19ed32=_0x1a2a28;collidedWithBiggerEnemy&&(collisionSound['currentTime']=0x0,collisionSound[_0x19ed32(0x134)]());}function checkCollisions(){const _0x583b0e=_0x1a2a28;collidedWithBiggerEnemy&&(collisionSound['currentTime']=0x0,collisionSound[_0x583b0e(0x134)]());}gameLoop();
console.log("ficker.eth!");
}
ENSMaxis to the moon! #1409();
