package com.example.acadx_mobile_app_0_1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar progressBar;

    // Replace this with your actual website URL
    private static final String BASE_URL = "https://dev.acadx.xyz/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progressBar = findViewById(R.id.progressBar);
        webView = findViewById(R.id.webView);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        webView.clearCache(true);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();

                if (url.startsWith("whatsapp://")) {
                    // Handle WhatsApp links
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    PackageManager pm = getPackageManager();
                    if (intent.resolveActivity(pm) != null) {
                        startActivity(intent);
                    } else {
                        Toast.makeText(MainActivity.this, "WhatsApp not installed.", Toast.LENGTH_SHORT).show();
                    }
                    return true;
                }

                view.loadUrl(url); // Load other links normally
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                progressBar.setVisibility(View.GONE);
                super.onPageFinished(view, url);
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                if (newProgress < 100 && progressBar.getVisibility() == View.GONE) {
                    progressBar.setVisibility(View.VISIBLE);
                } else if (newProgress == 100) {
                    progressBar.setVisibility(View.GONE);
                }
            }
        });

        webView.loadUrl(BASE_URL);
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
