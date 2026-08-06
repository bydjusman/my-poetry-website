CONTACT FORM SETUP GUIDE
========================

This guide walks you through setting up the fully functional contact form with Formspree backend integration.

## FILES CREATED/MODIFIED

1. index.html - Updated with new form fields and structure
2. styles.css - Updated with form styling
3. contact-form.js - New file with form validation and submission logic

## STEP-BY-STEP SETUP INSTRUCTIONS

### STEP 1: Set Up Formspree Account

1. Go to https://formspree.io
2. Sign up for a free account (or log in if you already have one)
3. Click "Create a new form"
4. Enter your email address where you want to receive messages
5. Choose a form name (e.g., "Poetry Website Contact")
6. Click "Create"
7. You'll see your form endpoint ID (looks like: f/xxxxxxxxxxxxx)
8. Copy the ID part (just the xxxxxxxxxxxxx after f/)

### STEP 2: Update Your JavaScript Configuration

1. Open contact-form.js in your text editor
2. Find this line (line 4):
   const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

3. Replace YOUR_FORMSPREE_ID with your actual Formspree ID
   Example:
   const FORMSPREE_ID = 'xyzabc123def456';

4. Save the file

### STEP 3: Verify File Structure

Your project folder should now contain:
├── index.html
├── styles.css
├── contact-form.js  (NEW FILE)
└── README.md

### STEP 4: Test the Form Locally

1. Open index.html in your web browser
2. Scroll to the "Get In Touch" section
3. Try submitting an empty form - you should see validation errors
4. Fill in all fields with valid data:
   - Name: Your Name
   - Email: your@email.com
   - Subject: Test Subject
   - Message: This is a test message to verify the form works correctly

5. Click "Send Message"
6. You should see a loading spinner, then a success message
7. Check your email - you should receive the message within seconds

### STEP 5: Optional - Formspree Email Settings

For better control over received emails:

1. Log in to Formspree
2. Go to your form settings
3. Configure email notifications (optional):
   - Add confirmation email to sender
   - Set up email forwarding
   - Enable spam protection

## FEATURES INCLUDED

✓ Client-side validation for all fields:
  - Name: 2-50 characters
  - Email: Valid email format
  - Subject: 3-100 characters
  - Message: 10-5000 characters

✓ Real-time validation feedback:
  - Errors show on blur (when you leave a field)
  - Errors clear on focus (when you click in a field)
  - Red border indicates invalid fields

✓ User feedback:
  - Success message after submission
  - Error messages for validation or network issues
  - Loading spinner during submission
  - Submit button disabled while sending

✓ Responsive design:
  - Matches your existing website styling
  - Works on mobile, tablet, and desktop
  - Proper spacing and typography

✓ Security:
  - Input validation prevents spam
  - Formspree handles spam filtering
  - No sensitive data stored locally

## HOW IT WORKS

1. User fills out form and clicks "Send Message"
2. JavaScript validates all fields client-side
3. If validation passes, form data is sent to Formspree
4. Formspree forwards the message to your email
5. Success message displays to user
6. Form is cleared for next submission

## TROUBLESHOOTING

### Issue: Form submits but I don't receive emails

Solution:
1. Check your spam/junk folder
2. Verify you entered correct email in Formspree
3. Log in to Formspree and check form stats
4. Try submitting again from Formspree dashboard

### Issue: Validation errors appear but form looks correct

Solution:
1. Check browser console (F12) for JavaScript errors
2. Verify all field names match: name, email, subject, message
3. Ensure contact-form.js is loaded (check Network tab in F12)

### Issue: "Network error" message appears

Solution:
1. Check internet connection
2. Verify Formspree ID is correct in contact-form.js
3. Check browser console for CORS errors
4. Try submitting again

### Issue: Loading spinner never stops

Solution:
1. Check browser console for errors
2. Verify Formspree endpoint is accessible
3. Try refreshing the page and submitting again
4. Check if ad blocker is blocking the request

## CUSTOMIZATION OPTIONS

### Change validation rules (in contact-form.js):

Find the validationRules object and modify:
- Minimum/maximum character lengths
- Error messages
- Required fields

### Change success/error messages (in contact-form.js):

Search for these lines to customize:
- Line with "Message sent successfully!"
- Line with "Failed to send message"
- Line with "Network error"

### Change form styling (in styles.css):

Modify these sections to match your brand:
- .alert-success: Success message background
- .alert-error: Error message background
- .submit-btn: Button styling
- .spinner: Loading animation

## FORMSPREE FEATURES (Free Plan)

✓ 50 form submissions per month
✓ Email notifications
✓ No setup required
✓ Spam filtering included
✓ Upgrade available for higher limits

## NEXT STEPS

1. Complete all 5 setup steps above
2. Test the form thoroughly
3. Share your website with others
4. Monitor received messages in your email

## SUPPORT

If you encounter issues:
1. Check Formspree status: https://status.formspree.io
2. Visit Formspree docs: https://formspree.io/help
3. Check browser console (F12) for specific errors
4. Verify all configuration steps are complete

---
Setup Complete! Your contact form is ready to use.
