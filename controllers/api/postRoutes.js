const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updated] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updated) {
      const updatedPost = await Post.findByPk(req.params.id);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleted = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

