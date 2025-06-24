package com.example.acadx_mobile_app_0_1;

import androidx.appcompat.app.AppCompatActivity;

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

    private static final String API_URL = "https://raw.githubusercontent.com/tusharneje-07/acadx-public/refs/heads/main/2025.06.19/notifications/web-handler.json";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progressBar = findViewById(R.id.progressBar);
        webView = findViewById(R.id.webView);

        // Enable JavaScript and caching
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);

        // Set WebViewClient
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleSpecialUrls(request.getUrl().toString());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleSpecialUrls(url);
            }

            private boolean handleSpecialUrls(String url) {
                if (url.contains("api.whatsapp.com") || url.contains("wa.me") || url.startsWith("whatsapp://")) {
                    return openWhatsAppUrl(url);
                }
                return false; // allow WebView to load other URLs
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                progressBar.setVisibility(View.GONE);
                super.onPageFinished(view, url);
            }
        });

        // Set WebChromeClient to update the progress bar
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

        // Fetch dynamic URL and load it in WebView
        WebUrlFetcher fetcher = new WebUrlFetcher();
        fetcher.fetchWebUrl(API_URL, new WebUrlFetcher.Callback() {
            @Override
            public void onResult(String webUrl) {
                runOnUiThread(() -> webView.loadUrl(webUrl));
            }

            @Override
            public void onError(Exception e) {
                runOnUiThread(() -> {
                    Toast.makeText(MainActivity.this, "Failed to load URL", Toast.LENGTH_SHORT).show();
                    e.printStackTrace();
                });
            }
        });
    }

    private boolean openWhatsAppUrl(String url) {
        try {
            // First try to open with system default handler
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(url));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            if (isIntentAvailable(intent)) {
                startActivity(intent);
                return true;
            }

            // If that fails, try specific WhatsApp packages
            String[] whatsappPackages = {
                    "com.whatsapp",
                    "com.whatsapp.w4b"
            };

            for (String packageName : whatsappPackages) {
                if (isAppInstalled(packageName)) {
                    intent.setPackage(packageName);
                    if (isIntentAvailable(intent)) {
                        startActivity(intent);
                        return true;
                    }
                    // Reset package for next iteration
                    intent.setPackage(null);
                }
            }

            // If still no luck, try to open WhatsApp directly and let user share manually
            if (isAppInstalled("com.whatsapp")) {
                Intent whatsappIntent = new Intent(Intent.ACTION_SEND);
                whatsappIntent.setType("text/plain");
                whatsappIntent.setPackage("com.whatsapp");
                whatsappIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                // Extract text from URL
                String text = extractTextFromWhatsAppUrl(url);
                if (!text.isEmpty()) {
                    whatsappIntent.putExtra(Intent.EXTRA_TEXT, text);

                    if (isIntentAvailable(whatsappIntent)) {
                        startActivity(whatsappIntent);
                        return true;
                    }
                }
            }

            // Last resort: try WhatsApp Business
            if (isAppInstalled("com.whatsapp.w4b")) {
                Intent whatsappIntent = new Intent(Intent.ACTION_SEND);
                whatsappIntent.setType("text/plain");
                whatsappIntent.setPackage("com.whatsapp.w4b");
                whatsappIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                // Extract text from URL
                String text = extractTextFromWhatsAppUrl(url);
                if (!text.isEmpty()) {
                    whatsappIntent.putExtra(Intent.EXTRA_TEXT, text);

                    if (isIntentAvailable(whatsappIntent)) {
                        startActivity(whatsappIntent);
                        return true;
                    }
                }
            }

            Toast.makeText(this, "WhatsApp not available or cannot handle this URL", Toast.LENGTH_SHORT).show();

        } catch (Exception e) {
            Toast.makeText(this, "Error opening WhatsApp: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        }

        return true; // prevent WebView from loading WhatsApp links
    }

    private boolean isAppInstalled(String packageName) {
        try {
            getPackageManager().getPackageInfo(packageName, 0);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }

    private boolean isIntentAvailable(Intent intent) {
        return intent.resolveActivity(getPackageManager()) != null;
    }

    private String extractTextFromWhatsAppUrl(String url) {
        try {
            Uri uri = Uri.parse(url);
            String text = uri.getQueryParameter("text");
            if (text != null) {
                return Uri.decode(text);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
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