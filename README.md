# Prime Crawler
<i> Amazon Based Web Crawler </i>


<p> Prime Crawler is a specialized Amazon scraping tool engineered to provide concise product information, including current prices and product images. Utilizing Perl, the crawler focuses on delivering essential details to users, empowering them to track product prices and visualize items with ease on the Amazon platform.</p>

# Install Dependencies

### 1. Install Perl Dependencies:

```
cpan WWW::Mechanize
cpan HTML::TreeBuilder JSON
```
<hr>

## Node.js Installation:
Download Node.js:
Go to the <a href="https://nodejs.org/en" target="_blanl"> Node.Js </a> website.

### Verify Installation:
Open a terminal or command prompt.
Run the following commands to verify that Node.js and npm (Node Package Manager) are installed:
```
node -v
npm -v
```

### 2. Install Node.js Dependencies:

```
npm install express body-parser
```

### 3. Running the Application:
Start the Server:

```
node server.js
```
4. Access the Application:
Open a web browser and navigate to http://localhost:3000 to access the application.

Additional Notes:
Make sure to replace amazon_scraper.pl with the correct path to your Perl script if it's located in a different directory.
Adjust the server port (3000 in this case) if necessary, based on your environment or configuration.
