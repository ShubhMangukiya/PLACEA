import fs from 'fs';
import convert from 'xml-js';
import moment from 'moment';

const jsonFilePath = '../json/posts.json';
const hostImageURL = 'https://www.placea.in/_next/image?url=';
const hostBlogBaseURL = 'https://www.placea.in';
const options = { compact: true, spaces: 4 };

/* 
    Method to Fetch dynamic List of URLs from JSON
*/
const fetchBlogsList = async () => {
    try {
        const jsonData = await fs.promises.readFile(jsonFilePath, 'utf8');
        const blogPosts = JSON.parse(jsonData);

        if (blogPosts) {
            const sitemapList = {
                urlset: {
                    _attributes: {
                        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
                        'xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1'
                    },
                    url: []
                }
            };

            blogPosts.forEach(post => {
                const modifiedTitle = post.frontmatter.title.replace(/- /g, '').replace(/ /g, '-').toLowerCase();
                const postUrl = `${hostBlogBaseURL}/${modifiedTitle}`;
                const encodedImageUrl = encodeURIComponent(post.frontmatter.image);
                
                const imageUrl = `${hostImageURL}${encodedImageUrl}`;
                const imageCaption = post.frontmatter.caption;
                const imageWidth = 1080; // Replace with actual image width
                const imageHeight = 75; // Replace with actual image height

                sitemapList.urlset.url.push({
                    loc: {
                        _text: postUrl
                    },
                    'image:image': [
                        {
                                'image:loc': {
                                    _text: `${imageUrl}&w=${imageWidth}&q=${imageHeight}`
                                }   
                        }
                    ]
                });
            });

            createSitemapFile(sitemapList);
        }
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
    }
};

/* 
    Method to convert JSON format data into XML format
*/
const createSitemapFile = (list) => {
    const finalXML = convert.json2xml(list, options);
    saveNewSitemap(finalXML);
};

/* 
    Method to Update sitemap.xml file content
*/
const saveNewSitemap = (xmltext) => {
    fs.writeFile('sitemap-images.xml', xmltext, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Image sitemap generated!");
    });
};

fetchBlogsList();
