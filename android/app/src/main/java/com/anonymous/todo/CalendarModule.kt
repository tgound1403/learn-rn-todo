package com.anonymous.todo;

import android.util.Log
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalendarModule"

    @ReactMethod fun createCalendarEvent(name: String, location: String) {
        Log.d("CalendarModule", "Create event called with name: $name and location: $location")
    }
}