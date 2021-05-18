import { Sequelize } from 'sequelize';
import { DataSource } from 'apollo-datasource'
//An API to access the database

class PostAPI extends DataSource {
    constructor({ data }){
        super();
        this.data = data;
    }

    initialize(config) {
        this.context = config.context;
    }

    /**
     * Get every post.
     * @returns [Post]
     */
    async getAllPosts() {
        const posts = await this.data.posts.findAll()
        return posts;
    }

    /**
     * Get a post by ID.
     * @param {int} id 
     * @returns Post
     */
    async findPost({ id }) {
        const post = await this.data.posts.findOne({ where: {id: id} });
        return post;
    }

    /**
     * Gets every post contains the searching value, case incensitive.
     * @param {String} title
     * @returns [Post]
     */
    async searchByTitle({ title }) {
        return await this.data.posts.findAll({
            where: {
                title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', '%' + title + '%')
            }
        })
    }

    /**
     * Create a post by title and text
     * @param {String} title
     * @param {String} text
     * @returns Post
     */
    async createPost({ title, text }){
        const post = await this.data.posts.create({
            title: title,
            text: text,
        })
        return post
    }

    /**
     * Delete a post by ID.
     * @param {int} id
     * @returns Boolean
     */
    async deletePost({ id }) {
        return !!this.data.posts.destroy({ where: {id: id} });
    }

    /**
     * Modify a post's title and text by ID.
     * @param {int} id
     * @param {title} title
     * @param {text} text
     * @returns 
     */
    async modifyById({ id, title, text }) {
        const post = this.findPost({ id })
        if(!post){
            return false;
        }
        if(typeof title !== 'undefined'){
            await this.data.posts.update({ 
                title: title
            }, {
                where: {
                    id: id
                }
            });
        }
        if(typeof text !== 'undefined'){
            await this.data.posts.update({ 
                text: text
            }, {
                where: {
                    id: id
                }
            });
        }
        return true;
    }
}

/**
 * A function to initialize Sequelize databse(currently sqlite).
 * @returns data
 */
function generateData() {
    // TODO: change database to mysql
    const db = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite'
    });

    try {
        db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const posts = db.define('post', {
        title: Sequelize.STRING,
        text: Sequelize.STRING,
    });

    return { db, posts }
}

export { PostAPI, generateData }