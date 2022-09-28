---
id: extension
title: Deep Links
---

Deep Links
--------------------

1. Navigate to app > AndroidManifest.xml and add the below code to it. As we are creating a deep link for our MainActivity.java file so we have to add this code in the MainActivity part. Comments are added in the code to get to know in more detail.

2. 'AndroidManifest.xml'

<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />

  <!-- on below line we are specifying the host name and the scheme type in add your App name -->
   <data
        android:host="https://cleverpush.com"
        android:scheme="cleverpush" />
</intent-filter>
  
<!-- below is the same filter as above just the scheme is changed to your app name -->
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
<!-- here the host must be customer's website -->
  <data
    android:host="www.cleverpush.com"
    android:scheme="cleverpush" />
</intent-filter>

3. Working with the MainActivity.java file.
```java
Go to the MainActivity.java file and refer to the following code. Comments are added inside the code to understand the code in more detail.

```java
public class MainActivity extends AppCompatActivity {

@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.activity_main);
		
	// getting the data from our intent in our uri.
	Uri uri = getIntent().getData();
	
	// checking if the uri is null or not.
	if (uri != null) {
		// if the uri is not null then we are getting the
		// path segments and storing it in list.
		List<String> parameters = uri.getPathSegments();
		
		// after that we are extracting string from that parameters.
		String param = parameters.get(parameters.size() - 1);
		
		// You can check in our Logcat in your param parameter Log.
		Log.e("param",param);
    
	  }
  }
}
