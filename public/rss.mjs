import fs from 'fs';
import moment from 'moment';
import xmljs from 'xml-js';

const jsonFilePath = '../json/posts.json';
const hostBlogBaseURL = 'https://placea.in';
const feedTitle = 'PLACEA';
const feedDescription = 'Easy Travel Planning with Placea Explore - Where You Meets Adventure';
const feedLink = 'https://www.placea.in/rss.xml';
const feedLanguage = 'en-us'; // Add a language tag
const options = { compact: true, spaces: 4 };

const fetchBlogsList = async () => {
    try {
        const jsonData = await fs.promises.readFile(jsonFilePath, 'utf8');
        const blogPosts = JSON.parse(jsonData);

        // Inside the fetchBlogsList function
        if (blogPosts) {
            const feedItems = [];

            blogPosts.forEach(post => {
                const modifiedTitle = post.frontmatter.title.replace(/- /g, '').replace(/ /g, '-').toLowerCase();
                const postUrl = `${hostBlogBaseURL}/${modifiedTitle}`;
                const encodedImageUrl = encodeURIComponent(post.frontmatter.image);
                const imageUrl = `${hostBlogBaseURL}/_next/image?url=${encodedImageUrl}&amp;w=1920&amp;q=75`;
                const pubDate = moment(post.date).format('ddd, DD MMM YYYY HH:mm:ss ZZ');

                feedItems.push({
                    title: post.frontmatter.title,
                    link: postUrl,
                    guid: postUrl,
                    description: post.frontmatter.description,
                    pubDate: pubDate,
                    imageUrl: imageUrl,
                });
            });

            createRSSFeed(feedItems);
        }
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
    }
};
const createRSSFeed = (items) => {
    const feedData = {
        _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
        rss: {
            _attributes: { version: '2.0', 'xmlns:atom': 'http://www.w3.org/2005/Atom' },
            channel: {
                title: { _text: feedTitle },
                link: { _text: feedLink },
                description: { _text: feedDescription },
                'atom:link': { _attributes: { href: feedLink, rel: 'self', type: 'application/rss+xml' } },
                language: { _text: feedLanguage },
                item: items.map(item => ({
                    title: { _text: item.title },
                    link: { _text: item.link },
                    description: { _text: item.description },
                    pubDate: { _text: item.pubDate },
                    enclosure: {
                        _attributes: {
                            url: item.imageUrl,
                            type: 'image/jpg',
                            length: 12345,
                        },
                    },
                    guid: { _text: item.guid }, // Add guid element
                })),
            },
        },
    };

    const feedXML = xmljs.json2xml(feedData, options);
    saveRSSFeed(feedXML);
}

const saveRSSFeed = (xmltext) => {
    fs.writeFile('rss.xml', xmltext, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("RSS feed generated!");
        }
    });
}

fetchBlogsList();
