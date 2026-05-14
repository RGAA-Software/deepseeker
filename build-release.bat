@echo off
REM DeepSeeker - Windows Build Script
REM ====================================

echo [DeepSeeker] Installing dependencies...
call pnpm install
if %errorlevel% neq 0 (
    echo [DeepSeeker] pnpm install failed.
    exit /b %errorlevel%
)

echo [DeepSeeker] Compiling frontend and Rust backend...
pnpm tauri build 2>&1

echo.
echo ================================================================
echo If MSI bundling failed due to WiX download timeout, the exe
echo is already compiled and ready to use at:
echo.
echo     src-tauri\target\release\deepseeker.exe
echo.
echo To create an MSI installer manually:
echo   1. Download WiX Toolset v3.14 from:
echo      https://github.com/wixtoolset/wix3/releases/tag/wix3141rtm
echo   2. Extract wix314-binaries.zip to:
echo      %%USERPROFILE%%\.tauri\wix\
echo   3. Re-run this script
echo ================================================================
pause
