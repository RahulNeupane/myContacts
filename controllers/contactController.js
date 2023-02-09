const asyncHandlder = require("express-async-handler")
const Contact = require("../models/contactModel")

//@description Get all contacts
//@route Get /api/contacts
//@access private
const getContacts =asyncHandlder( async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})
//@description Create new contacts
//@route Post /api/contacts
//@access private
const createContact = asyncHandlder( async (req, res) => {
    console.log("The request body is", req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone){
        res.status(400)
        throw new Error('all fields are mandatory!')
    }
    const contact = await Contact.create({
        name,email,phone,user_id: req.user.id
    })
    res.status(201).json(contact)
})

//@description get contacts
//@route Post /api/contacts/:id
//@access private
const getContact = asyncHandlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not fouond")
    }
    res.status(200).json(contact)
})

//@description update contacts
//@route Put /api/contacts/:id
//@access private
const updateContact =asyncHandlder( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not fouond")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
})

//@description delete contacts
//@route Delete /api/contacts/:id
//@access private
const deleteContact = asyncHandlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not fouond")
    }
    await contact.remove()
    res.status(200).json(contact)
})

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }