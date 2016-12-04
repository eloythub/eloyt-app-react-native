# install rnpm to link some modules to ur app like in IOS
```
sudo npm install -g rnpm
```

# important
```
npm install
```
don't forget to add these lines into ur ~/.bash_profile
```
export ANDROID_HOME=<sdk directory>
export PATH="$ANDROID_HOME/platform-tools/:$PATH"
```
run this after
```
source ~/bash_profile
```

# Run App on android device (Debug mode)
```
# make sure device is able to launch the app

adb devices

# result would be something like this
#    List of devices      attached
#    4d009706bcee407b	    device

# run packager before launch the android app on deferent tab from ur source
npm start

# launch app on ur android device/emulator
npm run android
```

# Reverse Access from phone to localhost api server
```
adb reverse tcp:8090 tcp:8090

# or if u are also interested to track your connected devices on adb u can use this:
npm run android-devices
```

# Run App on android device (Release mode)
```
npm run android-release
```

# Build APK file
```
npm run build-android
```

# !Don't forget
in order to be able to release the app u need to have some configuration in FB account for the app eloyt

Contact for more info: Mahan Hazrati<eng.mahan.hazrati@gmail.com>
