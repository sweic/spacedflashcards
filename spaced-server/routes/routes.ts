import express from 'express'
import { fetchData, fetchCardByID } from "../controllers/fetchData"
import { querySearchHistory } from "../controllers/querySearch"
import { registerAuth, loginAuth, verifyCookie, logoutAuth  } from "../controllers/registerAuth"
import { updateCount, deleteDeck, editDeck, saveDeck, importDeck } from "../controllers/updateDeck"
import { acceptFriendRequest, createNotification, deleteActivity, importSharedDeck, sendFriendRequest } from "../controllers/updateSocial"
const router = express.Router()

router.post('/registerAuth', registerAuth)
router.post('/loginAuth', loginAuth)
router.get('/verifyCookie', verifyCookie)
router.get('/logout', logoutAuth)

router.post('/saveDeck', saveDeck)

router.post('/fetchData', fetchData)
router.post('/fetchCardByID', fetchCardByID)

router.post('/updateCount', updateCount)
router.post('/deleteDeck', deleteDeck)
router.post('/editDeck', editDeck)
router.post('/importDeck', importDeck)

router.post('/querySearchHistory', querySearchHistory)
router.post('/deleteActivity', deleteActivity)
router.post('/acceptFriendRequest', acceptFriendRequest)
router.post('/sendFriendRequest', sendFriendRequest)
router.post('/createNotification', createNotification)
router.post('/importSharedDeck', importSharedDeck)

export default router