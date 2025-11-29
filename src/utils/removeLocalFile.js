import fs from 'fs';

export function removeLocalFile(filePath){
    if(!filePath) return;

    if(fs.existsSync(filePath))
        fs.unlinkSync(filePath, function(err){
            if(err)
                console.error(`temp file deletion failed ${{
                filePath,
                message : err.message   
                }}`);       
    });
};