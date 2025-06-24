package com.example.acadx_mobile_app_0_1;

import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class WebUrlFetcher {

    public interface Callback {
        void onResult(String webUrl);
        void onError(Exception e);
    }

    public void fetchWebUrl(String apiUrl, Callback callback) {
        new Thread(() -> {
            try {
                URL url = new URL(apiUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");

                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;

                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }

                reader.close();

                JSONObject jsonObject = new JSONObject(response.toString());

                String firstKey = jsonObject.keys().next();
                JSONObject inner = jsonObject.getJSONObject(firstKey);
                String webUrl = inner.getString("web_url");

                callback.onResult(webUrl);

            } catch (Exception e) {
                callback.onError(e);
            }
        }).start();
    }
}
