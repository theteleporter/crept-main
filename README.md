# Crept Studio

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/theteleporter/crept-main.git
    ```

2. **Install Dependencies:**

    ```bash
    cd crept-main
    npm install
    ```

3. **Set Up Vercel KV:**
    - Create a Vercel KV instance.
    - Add the following environment variables to your Vercel project settings:
        - `KV_REST_API_URL`
        - `KV_REST_API_TOKEN`
        - (Optional) `KV_NAMESPACE` (if you're using namespaces)

4. **Configure Mailgun (Optional):**
    - Create a Mailgun account.
    - Add the following environment variables to your Vercel project settings:
        - `MAILGUN_SMTP_LOGIN=`
        - `MAILGUN_SMTP_PASSWORD=`
        - `ADMIN_EMAIL=` (the email to receive notifications)
        - `COMPANY_EMAIL=` (your company's email)
        - `KV_REST_API_READ_ONLY_TOKEN=`
        - `KV_REST_API_TOKEN=`
        - `KV_REST_API_URL=`
        - `KV_URL=`
        - `SITE_URL=`

5. **Other Environment Variables:**
    - `NEXT_PUBLIC_APP_URL`: Your application's public URL.
    - `DEVELOPMENT_APP_URL`: Set to `http://localhost:3000` for local development.

6. **Create a Google API Secret Key:**
    This is to submit sitemaps and rss feed to Google Search Console automatically. To interact with Google APIs (such as Google Search Console), you'll need to create a Google API secret key. Follow these steps to generate one:
    - **Create a Google Cloud Project**:
        - Go to the [Google Cloud Console](https://console.cloud.google.com/).
        - Click on the project dropdown at the top of the page and select **New Project**.
        - Enter a project name and click **Create**.
    - **Enable the API**:
        - Navigate to the [API Library](https://console.cloud.google.com/apis/library).
        - Search for and select the API you need (e.g., "Search Console API").
        - Click **Enable** to enable the API for your project.
    - **Create Service Account Credentials**:
        - Go to the [Credentials page](https://console.cloud.google.com/apis/credentials).
        - Click **Create Credentials** and select **Service Account**.
        - Enter a name for the service account, and optionally a description, then click **Create**.
        - Grant the necessary roles (e.g., "Search Console API" permissions), then click **Continue**.
        - Click **Done**.
    - **Generate and Download the JSON Key**:
        - After creating the service account, click on it in the list to open its details.
        - Go to the **Keys** tab and click **Add Key**.
        - Choose **JSON** and click **Create**. A JSON key file will be downloaded.
    - **Securely Store Your JSON Key**:
        - Move the downloaded JSON key file to your project's directory (e.g., `app/data/keys/`).
    - **Configure Your Project**:
        - Update your project configuration to use the path to the JSON key file. For example, you might set an environment variable or directly reference the file in your code.

    **Example Configuration**:

    ```javascript
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'path/to/your/credentials.json'),
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });
    ```

7. **Start the Development Server:**

    ```bash
    npm run dev
    ```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License.
