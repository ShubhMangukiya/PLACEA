import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment';
import xmljs from 'xml-js';

const jsonFilePath = '../json/posts.json';
const hostBlogBaseURL = 'https://placea.in';
const feedTitle = 'Your Blog Title';
const feedDescription = 'Your blog description here';
const feedLink = 'https://placea.in/rss';
const selfLink = 'https://placea.in/rss';
const options = { compact: true, spaces: 4 };

const fetchBlogsList = async () => {
    try {
        const jsonData = await fs.promises.readFile(jsonFilePath, 'utf8');
        const blogPosts = JSON.parse(jsonData);

        if (blogPosts) {
            const feedItems = [];

            blogPosts.forEach((post, index) => {
                const modifiedTitle = post.frontmatter.title.replace(/- /g, '').replace(/ /g, '-').toLowerCase();
                const postUrl = `${hostBlogBaseURL}/${modifiedTitle}`;
                const pubDate = moment(post.date).format('ddd, DD MMM YYYY HH:mm:ss ZZ');

                feedItems.push({
                    title: post.frontmatter.title,
                    link: postUrl,
                    description: post.content,
                    pubDate: pubDate,
                    guid: `unique-guid-${index}`, // Generate a unique identifier for each item
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
            _attributes: { version: '2.0', xmlns: 'http://www.w3.org/2005/Atom' },
            channel: {
                title: { _text: feedTitle },
                link: { _text: feedLink },
                description: { _text: feedDescription },
                'atom:link': {
                    _attributes: {
                        href: selfLink,
                        rel: 'self',
                        type: 'application/rss+xml',
                    },
                },
                item: items.map(item => ({
                    title: { _text: item.title },
                    link: { _text: item.link },
                    description: { _text: item.description },
                    pubDate: { _text: item.pubDate },
                    guid: { _text: item.guid }, // Add the unique GUID
                })),
            },
        },
    };

    const feedXML = xmljs.json2xml(feedData, options);
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
