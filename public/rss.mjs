import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment';
import xmljs from 'xml-js'; // Import the module as 'xmljs' instead of 'convert'

const jsonFilePath = '../json/posts.json';
const hostBlogBaseURL = 'https://placea.in';
const feedTitle = 'Your Blog Title';
const feedDescription = 'Your blog description here';
const feedLink = 'https://placea.in/rss'; // Change this to your actual feed URL
const options = { compact: true, spaces: 4 };

const fetchBlogsList = async () => {
    try {
        const jsonData = await fs.promises.readFile(jsonFilePath, 'utf8');
        const blogPosts = JSON.parse(jsonData);

        if (blogPosts) {
            const feedItems = [];

            blogPosts.forEach(post => {
                const modifiedTitle = post.frontmatter.title.replace(/- /g, '').replace(/ /g, '-').toLowerCase();
                const postUrl = `${hostBlogBaseURL}/${modifiedTitle}`;
                const pubDate = moment(post.date).format('ddd, DD MMM YYYY HH:mm:ss ZZ'); // Adjust date format

                feedItems.push({
                    title: post.frontmatter.title,
                    link: postUrl,
                    description: post.content, // You might want to adjust this based on your data
                    pubDate: pubDate,
                });
            });

            createRSSFeed(feedItems);
        }
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
    }
}

const createRSSFeed = (items) => {
    const feedData = {
        _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
        rss: {
            _attributes: { version: '2.0' },
            channel: {
                title: { _text: feedTitle },
                link: { _text: feedLink },
                description: { _text: feedDescription },
                item: items.map(item => ({
                    title: { _text: item.title },
                    link: { _text: item.link },
                    description: { _text: item.description },
                    pubDate: { _text: item.pubDate },
                })),
            },
        },
    };

    const feedXML = xmljs.json2xml(feedData, options); // Use 'xmljs.json2xml' instead of 'convert.json2xml'
    saveRSSFeed(feedXML);
}

const saveRSSFeed = (xmltext) => {
    fs.writeFile('rss-feed.xml', xmltext, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("RSS feed generated!");
    });
}

fetchBlogsList();
