import os
import shutil
import ntpath
import sys

'''
Configuration
'''
srcdir      = sys.argv[1]
resdir      = sys.argv[2]
outputdir   = sys.argv[3]

src     = []
res     = []

def scandir(dir, arr):
    for filename in os.listdir(dir):
        path = os.path.join(dir, filename)
        #print path
        if os.path.isfile(path):
            arr.append(path)
            #print path
        else:
            scandir(path, arr)

def path_leaf(path):
    head, tail = ntpath.split(path)
    return tail or ntpath.basename(head)
    
def print_dir():
    for path in src:
        print path
    
def process():
    #List all files in source game
    scandir(srcdir, src)
    scandir(resdir, res)
    
    #Test all path
    print_dir()
    
    #Create destination source
    str = ""
    tmpArr = ["", "", "", "", "", "", "", "", "", "", ""];
    
    for script in src:        
        #Combine all script to one file
        fullname = path_leaf(script)
        name = os.path.splitext(fullname)[0]
        ext = os.path.splitext(fullname)[1]
        #print name +  " - " + ext
        
        if name == "AppConfig":
            tmpArr[0] = script
        elif name == "Utils":
            tmpArr[1] = script
        elif name == "Ball":
            tmpArr[2] = script
        elif name == "Player":
            tmpArr[3] = script
        elif name == "Scene":
            tmpArr[4] = script            
        elif name == "MainScreen":
            tmpArr[5] = script
        elif name == "PlayScreen":
            tmpArr[6] = script
        elif name == "PauseScreen":
            tmpArr[7] = script
        elif name == "SceneManager":
            tmpArr[8] = script
        elif name == "Game":
            tmpArr[9] = script
        elif name == "Application":
            tmpArr[10] = script
        else: 
            shutil.copy2(script, outputdir + "\\")
        # if os.path.splitext(script)[1] != ".html":
            # str += f.read()
        # else:
            # shutil.copy2(script, outputdir + "\\")
                
    for item in tmpArr:
        #print tmpArr[0]
        with open(item) as f:
            str += f.read()
    
    #print str

    #Create dir structure
    if os.path.exists(outputdir + "\\css"):
        shutil.rmtree(outputdir + "\\css")
    if os.path.exists(outputdir + "\\js"):
        shutil.rmtree(outputdir + "\\js")
    if os.path.exists(outputdir + "\\images"):
        shutil.rmtree(outputdir + "\\images")        
    
    os.makedirs(outputdir + "\\css")        
    os.makedirs(outputdir + "\\js")
    os.makedirs(outputdir + "\\images")
        
    #Write Game.js
    gamejs = open(outputdir + "\\js\\Game.js", "w+")
    gamejs.write(str)
    gamejs.close()
    
    #Copy res to output folder
    for item in res:
        ext = os.path.splitext(item)[1]
        if ext == ".js":
            shutil.copy2(item, outputdir + "\\js");
        elif ext == ".css" or ext == ".ttf":
            shutil.copy2(item, outputdir + "\\css");
        elif ext == ".png":
            shutil.copy2(item, outputdir + "\\images");
                 
def main():
    process()
    #print srcdir, resdir, outputdir
    
    
if __name__ == "__main__":
    main()
    