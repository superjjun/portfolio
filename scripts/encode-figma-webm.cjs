/* Convert actually recorded/cropped Figma MP4 to WebM, retaining all physical clicks. */
const fs=require('fs'),path=require('path'),cp=require('child_process');
const dir=path.resolve('fashion/assets/demos');
const names=['soundcloud','lostlink','junggonara','ppomppu','roundlab'];
for(const id of names){
 const input=path.join(dir,id+'-figma.mp4'),output=path.join(dir,id+'-figma.webm');
 if(!fs.existsSync(input))throw Error('Figma source not recorded: '+id);
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-i',input,'-an','-c:v','libvpx-vp9','-crf','32','-b:v','0','-cpu-used','5','-deadline','realtime','-row-mt','1','-pix_fmt','yuv420p',output],{stdio:'pipe',timeout:240000});
 const bytes=fs.statSync(output).size;
 if(bytes<30000)throw Error('Converted WebM too small '+id);
 console.log('FIGMA_WEBM_RECORDING',JSON.stringify({name:id,size:bytes}));
}
