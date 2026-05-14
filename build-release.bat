@echo off
REM DeepSeeker - Windows Build Script
REM ====================================

echo [DeepSeeker] Installing dependencies...
call pnpm install
if %errorlevel% neq 0 (
    echo [DeepSeeker] pnpm install failed.
    exit /b %errorlevel%
)

echo [DeepSeeker] Building release (exe only, skip msi bundling)...
pnpm tauri build --bundles none
if %errorlevel% neq 0 (
    echo [DeepSeeker] Build failed.
    exit /b %errorlevel%
)

echo [DeepSeeker] Done! Release exe at:
echo     src-tauri\target\release\deepseeker.exe
pause
