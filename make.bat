@echo off

echo ==============================================
echo            PONG GAME
echo ==============================================

set PYTHON_HOME=F:\DevTools\Python27

set CUR_DIR=%~dp0
set SRC_DIR=%CUR_DIR%source
set RES_DIR=%CUR_DIR%res
set SCRIPTS_DIR=%CUR_DIR%scripts
set OUT_DIR=%CUR_DIR%output

echo -----
echo -----
echo Load Configurations
echo Python path:           %PYTHON_HOME%
echo Current directory:     %CUR_DIR%
echo Source directory:      %SRC_DIR%
echo Resource directory:    %RES_DIR%
echo Scripts directory:     %SCRIPTS_DIR%
echo Output directory:      %OUT_DIR%
echo -----
echo -----


echo ==============================================
echo            PROCESSING
echo ==============================================

echo Processing
rmdir /s /q %OUT_DIR%
mkdir %OUT_DIR%

%PYTHON_HOME%\python.exe %SCRIPTS_DIR%\make.py %SRC_DIR% %RES_DIR% %OUT_DIR%
echo Build Successful

echo ==============================================
echo            END SCRIPT
echo ==============================================