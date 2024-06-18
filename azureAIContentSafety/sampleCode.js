//
// Copyright (c) Microsoft. All rights reserved.
// To learn more, please visit the documentation - Quickstart: Azure Content Safety: https://aka.ms/acsstudiodoc
//

package com.microsoft.cognitiveservices;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.Getter;
import okhttp3.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ContentSafetySampleCode {

    public static void main(String[] args) throws DetectionException, IOException {
        // Replace the placeholders with your own values
        String endpoint = "<endpoint>";
        String subscriptionKey = "<subscription_key>";

        // Initialize the ContentSafety object
        ContentSafety contentSafety = new ContentSafety(endpoint, subscriptionKey);

        // Set the media type and blocklists
        MediaType mediaType = MediaType.Text;
        String[] blocklists = {};

        // Set the content to be tested
        String content = "<test_content>";

        // Detect content safety
        DetectionResult detectionResult = contentSafety.detect(
                mediaType, content, blocklists);

        // Set the reject thresholds for each category
        Map<Category, Integer> rejectThresholds = new HashMap<>();
        rejectThresholds.put(Category.Hate, 4);
        rejectThresholds.put(Category.SelfHarm, 4);
        rejectThresholds.put(Category.Sexual, 4);
        rejectThresholds.put(Category.Violence, 4);

        // Make a decision based on the detection result and reject thresholds
        Decision decisionResult = contentSafety.makeDecision(detectionResult, rejectThresholds);
    }

    /**
     * Enumeration for media types
     */
    public enum MediaType {
        Text,
        Image
    }

    /**
     * Enumeration for categories
     */
    public enum Category {
        Hate,
        SelfHarm,
        Sexual,
        Violence
    }

    /**
     * Enumeration for actions
     */
    public enum Action {
        Accept,
        Reject
    }

    /**
     * Represents an exception raised when there is an error in detecting the content.
     */
    @Getter
    public static class DetectionException extends Exception {
        private final String code;
        private final String message;

        /**
         * Constructs a new detection exception.
         *
         * @param   code    The error code.
         * @param   message   The error message.
         */
        public DetectionException(String code, String message) {
            super(String.format("Error Code: %s, Message: %s", code, message));
            this.code = code;
            this.message = message;
        }
    }

    /**
     * Represents the decision made by the content moderation system.
     */
    @Getter
    public static class Decision {
        private final Action suggestedAction;
        private final Map<Category, Action> actionByCategory;

        /**
         * Constructs a new decision.
         *
         * @param   suggestedAction    The overall action suggested by the system.
         * @param   actionByCategory   The actions suggested by the system for each category.
         */
        public Decision(Action suggestedAction, Map<Category, Action> actionByCategory) {
            this.suggestedAction = suggestedAction;
            this.actionByCategory = actionByCategory;
        }
    }

    /**
     * Base class for detection requests.
     */
    @Data
    public static class DetectionRequest {

    }

    /**
     * Represents an image to be detected.
     */
    @Data
    public static class Image {
        private String content;

        /**
         * Constructs a new image.
         *
         * @param   content    The base64-encoded content of the image.
         */
        public Image(String content) {
            this.content = content;
        }
    }

    /**
     * Represents an image detection request.
     */
    @Data
    public static class ImageDetectionRequest extends DetectionRequest {
        private Image image;

        /**
         * Constructs a new image detection request.
         *
         * @param   content    The base64-encoded content of the image.
         */
        public ImageDetectionRequest(String content) {
            this.image = new Image(content);
        }
    }

    /**
     * Represents a text detection request.
     */
    @Data
    public static class TextDetectionRequest extends DetectionRequest {
        private String text;
        private String[] blocklistNames;

        /**
         * Constructs a new text detection request.
         *
         * @param   text    The text to be detected.
         * @param   blocklistNames    The names of the blocklists to use for detecting the text.
         */
        public TextDetectionRequest(String text, String[] blocklistNames) {
            this.text = text;
            this.blocklistNames = blocklistNames;
        }
    }

    /**
     * Represents a detailed detection result for a specific category.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class DetailedResult {
        private Category category;  // The category of the detection result.
        private Integer severity;   // The severity of the detection result.

        public DetailedResult(){}

        public DetailedResult(Category category, Integer severity){
            this.category = category;
            this.severity = severity;
        }
    }

    /**
     * Base class for detection result.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class DetectionResult {
        private List<DetailedResult> categoriesAnalysis;  // The detailed result for detection.
    }

    /**
     * Represents an image detection result.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class ImageDetectionResult extends DetectionResult {

    }

    /**
     * Represents a detailed detection result for a blocklist match.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class BlocklistDetailedResult {
        private String blocklistName;   // The name of the blocklist.
        private String blocklistItemId; // The ID of the block item that matched.
        private String blocklistItemText;   // The text of the block item that matched.
    }

    /**
     * Represents a text detection result.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class TextDetectionResult extends DetectionResult {
        // The list of detailed results for blocklist matches.
        private List<BlocklistDetailedResult> blocklistsMatch;
    }

    /**
     * Represents a detection error response.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class DetectionErrorResponse {
        private DetectionError error;   // The detection error.
    }

    /**
     * Represents a detection error.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class DetectionError {
        private String code;    // The error code.
        private String message; // The error message.
        private String target;  // The error target.
        private String[] details;   // The error details.
        private DetectionInnerError innererror; // The inner error.
    }

    /**
     * Represents a detection inner error.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class DetectionInnerError {
        private String code;    // The inner error code.
        private String innererror;  // The inner error message.
    }

    public static class ContentSafety {
        // The version of the Content Safety API to use.
        private static final String API_VERSION = "2023-10-01";
        // The valid threshold values.
        private static final List<Integer> VALID_THRESHOLD_VALUES = Arrays.asList(-1, 0, 2, 4, 6);
        // The media type for JSON data with the UTF-8 character encoding
        private static final okhttp3.MediaType JSON = okhttp3.MediaType.parse("application/json; charset=utf-8");
        // The HTTP client.
        private static final OkHttpClient client = new OkHttpClient();
        // The instance of ObjectMapper class used to serialize and deserialize JSON data
        private static final ObjectMapper MAPPER = new ObjectMapper();
        private final String endpoint;
        private final String subscriptionKey;

        /**
         * Initializes a new instance of the ContentSafety class.
         *
         * @param endpoint The endpoint URL for the Content Safety API.
         * @param subscriptionKey The subscription key for accessing the Content Safety API.
         */
        public ContentSafety(String endpoint, String subscriptionKey) {
            this.endpoint = endpoint;
            this.subscriptionKey = subscriptionKey;
        }

        /**
         * Builds the URL for the Content Safety API based on the media type.
         *
         * @param mediaType The media type.
         * @return The URL for the Content Safety API.
         */
        public String buildUrl(MediaType mediaType) {
            return switch (mediaType) {
                case Text ->
                        String.format("%s/contentsafety/text:analyze?api-version=%s", this.endpoint, API_VERSION);
                case Image ->
                        String.format("%s/contentsafety/image:analyze?api-version=%s", this.endpoint, API_VERSION);
                default -> throw new IllegalArgumentException(String.format("Invalid Media Type %s", mediaType));
            };
        }

        /**
         * Builds the request body for the Content Safety API.
         *
         * @param mediaType The media type.
         * @param content The content to be analyzed.
         * @param blocklists The blocklists to be used for analysis.
         * @return The request body for the Content Safety API.
         */
        public DetectionRequest buildRequestBody(MediaType mediaType, String content, String[] blocklists) {
            return switch (mediaType) {
                case Text -> new TextDetectionRequest(content, blocklists);
                case Image -> new ImageDetectionRequest(content);
                default -> throw new IllegalArgumentException(String.format("Invalid Media Type %s", mediaType));
            };
        }

        /**
         * Deserializes the detection result from JSON based on the media type.
         *
         * @param json The JSON string to be deserialized.
         * @param mediaType The media type.
         * @return The detection result object.
         * @throws JsonProcessingException If an error occurs during deserialization.
         */
        public DetectionResult deserializeDetectionResult(String json, MediaType mediaType) throws JsonProcessingException {
            return switch (mediaType) {
                case Text -> MAPPER.readValue(json, TextDetectionResult.class);
                case Image -> MAPPER.readValue(json, ImageDetectionResult.class);
                default -> throw new IllegalArgumentException(String.format("Invalid Media Type %s", mediaType));
            };
        }

        /**
         * Detects unsafe content using the Content Safety API.
         *
         * @param mediaType The media type of the content to detect.
         * @param content The content to detect.
         * @param blocklists The blocklists to use for text detection.
         * @return The response from the Content Safety API.
         * @throws IOException if an error occurs while reading the response from the API
         * @throws DetectionException if the API response cannot be correctly deserialized
         */
        public DetectionResult detect(MediaType mediaType, String content,
                                      String[] blocklists) throws IOException, DetectionException {
            String url = buildUrl(mediaType);
            Headers.Builder headersBuilder = new Headers.Builder();
            headersBuilder.add("Ocp-Apim-Subscription-Key", this.subscriptionKey);
            DetectionRequest requestBody = buildRequestBody(mediaType, content, blocklists);
            String payload = MAPPER.writeValueAsString(requestBody);

            Request request = new Request.Builder()
                    .url(url)
                    .headers(headersBuilder.build())
                    .post(RequestBody.create(payload, JSON))
                    .build();

            try (Response response = client.newCall(request).execute()) {

                if (response.body() == null) {
                    throw new DetectionException(String.valueOf(response.code()), "Response body is null.");
                }

                String responseText = response.body().string();

                System.out.println(response.code());
                for (String key : response.headers().names()) {
                    System.out.printf("%s: %s%n", key, response.headers().get(key));
                }
                System.out.println(responseText);

                if (!response.isSuccessful()) {
                    DetectionErrorResponse error = MAPPER.readValue(responseText, DetectionErrorResponse.class);
                    if (error == null || error.getError() == null ||
                            error.getError().getCode() == null || error.getError().getMessage() == null) {
                        throw new DetectionException(String.valueOf(response.code()),
                                String.format("Error is null. Response text is %s", responseText));
                    }
                    throw new DetectionException(error.getError().getCode(), error.getError().getMessage());
                }

                DetectionResult result = deserializeDetectionResult(responseText, mediaType);
                if (result == null) {
                    throw new DetectionException(String.valueOf(response.code()),
                            String.format("HttpResponse is null. Response text is %s", responseText));
                }

                return result;
            }
        }

        /**
         * Gets the severity score of the specified category from the given detection result.
         *
         * @param category The category to get the severity score for.
         * @param detectionResult The detection result object to retrieve the severity score from.
         * @return The severity score of the specified category.
         */
        public Integer getDetectionResultByCategory(Category category, DetectionResult detectionResult) {
            for(DetailedResult result: detectionResult.categoriesAnalysis){
                if(category.equals(result.getCategory())){
                    return result.getSeverity();
                }
            }
            throw new IllegalArgumentException(String.format("Invalid Category %s", category));
        }

        /**
         * Makes a decision based on the detection result and the specified reject thresholds.
         * Users can customize their decision-making method.
         *
         * @param detectionResult The detection result object to make the decision on.
         * @param rejectThresholds The reject thresholds for each category.
         * @return The decision made based on the detection result and the specified reject thresholds.
         */
        public Decision makeDecision(DetectionResult detectionResult, Map<Category, Integer> rejectThresholds) {
            Map<Category, Action> actionResult = new HashMap<>();
            Action finalAction = Action.Accept;
            for (Category category : rejectThresholds.keySet()) {
                Integer threshold = rejectThresholds.get(category);
                if (threshold == null || !VALID_THRESHOLD_VALUES.contains(threshold)) {
                    throw new IllegalArgumentException("RejectThreshold can only be in (-1, 0, 2, 4, 6)");
                }

                Integer severity = getDetectionResultByCategory(category, detectionResult);
                if (severity == null) {
                    throw new IllegalArgumentException(String.format("Can not find detection result for %s", category));
                }

                Action action;
                if (threshold != -1 && severity >= threshold) {
                    action = Action.Reject;
                } else {
                    action = Action.Accept;
                }
                actionResult.put(category, action);

                if (action.compareTo(finalAction) > 0) {
                    finalAction = action;
                }
            }

            if (detectionResult instanceof TextDetectionResult textDetectionResult) {
                if (textDetectionResult.getBlocklistsMatch() != null
                        && textDetectionResult.getBlocklistsMatch().size() > 0) {
                    finalAction = Action.Reject;
                }
            }

            System.out.println(finalAction);
            for (Category category : actionResult.keySet()) {
                System.out.printf("Category: %s, Action: %s%n", category, actionResult.get(category));
            }

            return new Decision(finalAction, actionResult);
        }
    }
}
