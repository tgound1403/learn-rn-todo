package com.anonymous.todo;

import android.annotation.SuppressLint
import android.database.Cursor;
import android.provider.ContactsContract;
import android.content.ContentResolver;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

class ContactsModule(val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ContactsModule"
    }

    @ReactMethod
    fun getContacts(promise: Promise) {
        try {
            var contactList: WritableArray = Arguments.createArray()
            var contentResolver: ContentResolver = reactContext.contentResolver
            var cursor = contentResolver.query(
                ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                null,
                null,
                null,
                null
            )
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    val name = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME))
                    val phone = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER))

                    var contact: WritableMap = Arguments.createMap()
                    contact.putString("name", name)
                    contact.putString("phone", phone)
                    contactList.pushMap(contact)
                }
                cursor.close()
            }
            promise.resolve(contactList)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}