const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

/** Post model */
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

/** Validation */
const validatePostInput = require('../../validation/post');

/** @route GET api/posts/test
 *  @desc Tests posts route
 *  @access Public
 */
router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));


/** @route GET api/posts
 *  @desc Get all the posts
 *  @access Public
 */
router.get('/', (req, res) => {
    Post.find().sort({date: -1}).then(posts => res.json(posts)).catch(err => res.status(404).json({noPostFound: 'No posts found'}));
});

/** @route GET api/posts/:post_id
 *  @desc Get post by id
 *  @access Public
 */
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => res.json(post)).catch(err => res.status(404).json({noPostFound: 'No post found with that ID'}));
})

/** @route POST api/posts
 *  @desc Create posts route
 *  @access Private
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

/** @route DELETE api/posts/:post_id
 *  @desc Delete posts route
 *  @access Private
 */
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({notauthorized: 'User not authorized'});
            }

            // Delete
            post.remove().then(() => res.json({success: true}));
        }).catch(err => res.status(404).json({postnotfound: 'Post has already been deleted'}));
    })
});

/** @route POST api/posts//like:like_id
 *  @desc Like post
 *  @access Private
 */
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({alreadyliked: 'User already liked this post'});
            }
            post.likes.unshift({user: req.user.id});
            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({postnotfound: 'Post has already been deleted'}));
    })
});

/** @route POST api/posts/unlike/:like_id
 *  @desc Like post
 *  @access Private
 */
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({notliked: 'You have not yet liked this post'});
            }
            const removeIndex = post.likes.map(item => item.user.toString().indexOf(req.user.id));
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({postnotfound: 'Post has already been deleted'}));
    })
});

/** @route POST api/posts/comment/post_id
 *  @desc Add comment to a post
 *  @access Private
 */
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id).then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post));
    }).catch(err => res.status(404).json({postnotfound: 'No post found.'}))
});

/** @route   DELETE api/posts/comment/:id/:comment_id
 *  @desc    Remove comment from post
 *  @access  Private
 */
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
        Post.findById(req.params.id).then(post => {
            /** Check to see if comment exists */
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({commentnotexists: 'Comment does not exist'});
            }

            /** Get remove index */
            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

            /**  Splice comment out of array */
            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
            .catch(err => res.status(404).json({postnotfound: 'No post found'}));
    }
);
module.exports = router;