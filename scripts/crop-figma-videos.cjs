/* Crop only actual Figma browser recordings, never synthesize frames. */
const fs=require('fs'),path=require('path'),cp=require('child_process');
const root=path.resolve('fashion/assets/demos');
const configs=[
 ['soundcloud',1302,840,98,60,1500],
 ['lostlink',378,820,310,60,1000],
 ['junggonara',378,820,310,60,1000],
 ['ppomppu',1408,880,96,60,1600],
 ['roundlab',378,820,310,60,1000]
];
for(const [id,w,h,x,y,originalWidth] of configs){
 const source=path.join(root,id+'-figma.mp4');
 if(!fs.existsSync(source))throw Error('Real Figma source absent '+id);
 const info=JSON.parse(cp.execFileSync('ffprobe',['-v','error','-show_entries','stream=width,height','-of','json',source],{encoding:'utf8'}));
 const dim=info.streams[0];
 if(dim.width!==originalWidth){console.log('SKIPPED_ALREADY_CROPPED',id,dim.width,dim.height);continue;}
 const tmp=path.join(root,id+'-figma-cropping.tmp.mp4');
 const crop='crop='+w+':'+h+':'+x+':'+y+',fps=20,setsar=1';
 cp.execFileSync('ffmpeg',['-y','-v','error','-i',source,'-vf',crop,'-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart','-an',tmp],{timeout:180000});
 const after=JSON.parse(cp.execFileSync('ffprobe',['-v','error','-show_entries','stream=width,height','-of','json',tmp],{encoding:'utf8'})).streams[0];
 if(after.width!==w||after.height!==h||fs.statSync(tmp).size<18000)throw Error('Cropping validation failed '+id);
 fs.renameSync(tmp,source);
 console.log('FIGMA_CROPPED_REAL',JSON.stringify({id,from:[dim.width,dim.height],to:[w,h],bytes:fs.statSync(source).size}));
}
