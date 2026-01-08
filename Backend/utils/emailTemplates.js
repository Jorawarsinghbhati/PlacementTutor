export const userBookingConfirmedTemplate = ({
    userName,
    mentorName,
    date,
    time,
    duration,
  }) => `
    <h2>🎉 Booking Confirmed!</h2>
    <p>Hi ${userName},</p>
  
    <p>Your session has been successfully booked.</p>
  
    <ul>
      <li><b>Mentor:</b> ${mentorName}</li>
      <li><b>Date:</b> ${date}</li>
      <li><b>Time:</b> ${time}</li>
      <li><b>Duration:</b> ${duration} minutes</li>
    </ul>
  
    <p>Meeting link will be shared 10 minutes before the session.</p>
  
    <p>— Team PlacementTutor</p>
  `;
  
  export const mentorBookingConfirmedTemplate = ({
    mentorName,
    userName,
    date,
    time,
    duration,
  }) => `
    <h2>📅 New Session Booked</h2>
    <p>Hi ${mentorName},</p>
  
    <p>You have a new mentoring session.</p>
  
    <ul>
      <li><b>Student:</b> ${userName}</li>
      <li><b>Date:</b> ${date}</li>
      <li><b>Time:</b> ${time}</li>
      <li><b>Duration:</b> ${duration} minutes</li>
    </ul>
  
    <p>Please be ready 5 minutes before start time.</p>
  
    <p>— Team PlacementTutor</p>
  `;

  export const userWelcomeTemplate = ({
    userName,
    userEmail
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">PlacementTutor</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Your Career Success Partner</p>
      </div>
  
      <!-- Main Content -->
      <div style="padding: 40px 30px; background-color: #ffffff; border: 1px solid #eaeaea; border-top: none;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2d3748; margin-bottom: 10px;">Welcome to PlacementTutor! 🎓</h2>
          <p style="color: #4a5568; font-size: 16px;">Thank you for joining our community of ambitious graduates</p>
        </div>
  
        <div style="background-color: #f7fafc; padding: 25px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #667eea;">
          <h3 style="color: #2d3748; margin-top: 0;">Your Journey Starts Here!</h3>
          <p style="margin-bottom: 15px;">We're thrilled to have you onboard. Here's what you can do next:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Complete your profile to get personalized job recommendations</li>
            <li style="margin-bottom: 8px;">Explore practice tests and interview preparation materials</li>
            <li style="margin-bottom: 8px;">Connect with mentors from top companies</li>
            <li style="margin-bottom: 8px;">Access exclusive placement opportunities</li>
          </ul>
        </div>
  
        <!-- Stats/Highlights -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; text-align: center;">
          <div style="flex: 1; padding: 15px;">
            <div style="font-size: 24px; color: #667eea; font-weight: bold;">500+</div>
            <div style="color: #4a5568; font-size: 14px;">Companies Hiring</div>
          </div>
          <div style="flex: 1; padding: 15px;">
            <div style="font-size: 24px; color: #667eea; font-weight: bold;">10K+</div>
            <div style="color: #4a5568; font-size: 14px;">Students Placed</div>
          </div>
          <div style="flex: 1; padding: 15px;">
            <div style="font-size: 24px; color: #667eea; font-weight: bold;">95%</div>
            <div style="color: #4a5568; font-size: 14px;">Success Rate</div>
          </div>
        </div>
  
        <!-- Call to Action -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://placementtutor.com/dashboard" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 14px 32px; 
                    text-decoration: none; 
                    border-radius: 6px; 
                    font-weight: bold; 
                    display: inline-block;
                    font-size: 16px;">
            Go to Dashboard →
          </a>
        </div>
  
        <!-- Tips Section -->
        <div style="background-color: #fff9e6; padding: 20px; border-radius: 8px; border: 1px solid #ffeaa7; margin-top: 25px;">
          <h4 style="color: #e17055; margin-top: 0;">💡 Quick Tip</h4>
          <p style="margin: 0;">Complete your profile within 24 hours to get early access to upcoming campus drives and premium resources!</p>
        </div>
      </div>
  
      <!-- Footer -->
      <div style="padding: 20px; text-align: center; color: #718096; font-size: 14px; border-top: 1px solid #eaeaea;">
        <p style="margin: 0 0 10px 0;">Need help? Contact our support team at <a href="mailto:support@placementtutor.com" style="color: #667eea;">support@placementtutor.com</a></p>
        <p style="margin: 0 0 10px 0;">Follow us: 
          <a href="#" style="color: #667eea; margin: 0 8px;">LinkedIn</a> | 
          <a href="#" style="color: #667eea; margin: 0 8px;">Instagram</a> | 
          <a href="#" style="color: #667eea; margin: 0 8px;">Twitter</a>
        </p>
        <p style="margin: 0; font-size: 12px;">© 2024 PlacementTutor. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  export const mentorApplicationTemplate = ({
    mentorName,
    currentCompany,
    jobTitle,
    yearsOfExperience,
    applicationDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; color: #333;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2c5282 0%, #4a5568 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">PlacementTutor</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Mentor Application</p>
      </div>
  
      <!-- Main Content -->
      <div style="padding: 40px 30px; background-color: #ffffff; border: 1px solid #eaeaea; border-top: none;">
        <!-- Confirmation Icon -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="background: linear-gradient(135deg, #3182ce, #2b6cb0); width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <span style="color: white; font-size: 36px;">✓</span>
          </div>
          <h2 style="color: #2d3748; margin-bottom: 10px;">🎓 Mentor Application Submitted!</h2>
          <p style="color: #4a5568; font-size: 16px;">Thank you for applying to become a PlacementTutor Mentor</p>
        </div>
        
        <!-- Greeting -->
        <p style="margin-bottom: 30px; font-size: 16px;">
          Dear <strong style="color: #2c5282;">${mentorName}</strong>,
        </p>
        
        <!-- Confirmation Message -->
        <div style="background-color: #f0f4f8; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
          <p style="margin: 0 0 15px 0;">
            We have successfully received your mentor application and forwarded it to our admin team for review.
          </p>
          <p style="margin: 0;">
            Your experience at <strong>${currentCompany}</strong> as a <strong>${jobTitle}</strong> with <strong>${yearsOfExperience} years</strong> of industry experience is exactly what our students need!
          </p>
        </div>
  
        <!-- Application Details -->
        <div style="border: 2px solid #e2e8f0; border-radius: 10px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #2d3748; margin-top: 0; margin-bottom: 20px;">📋 Application Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; width: 40%;"><strong>Application ID:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea; color: #2c5282;">MT${Date.now().toString().slice(-8)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea;"><strong>Submitted On:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea;">${applicationDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea;"><strong>Status:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eaeaea;">
                <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                  ⏳ Under Review
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Company:</strong></td>
              <td style="padding: 10px 0; font-weight: bold;">${currentCompany}</td>
            </tr>
          </table>
        </div>
  
        <!-- Next Steps -->
        <div style="background-color: #fff9e6; padding: 25px; border-radius: 8px; border: 1px solid #ffeaa7; margin-bottom: 30px;">
          <h4 style="color: #92400e; margin-top: 0;">📅 What Happens Next?</h4>
          <ol style="margin: 15px 0 0 0; padding-left: 20px; color: #92400e;">
            <li style="margin-bottom: 10px;">Our admin team will verify your credentials and experience</li>
            <li style="margin-bottom: 10px;">We'll check your offer letter and validate your current employment</li>
            <li style="margin-bottom: 10px;">You'll receive a confirmation email within <strong>3-5 business days</strong></li>
            <li>Once approved, you can start mentoring students for internships & placements</li>
          </ol>
        </div>
  
        <!-- Current Access -->
        <div style="background-color: #e6fffa; padding: 20px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #81e6d9;">
          <h4 style="color: #234e52; margin-top: 0;">🎯 Continue Your Learning Journey</h4>
          <p style="margin: 0; color: #234e52;">
            While your mentor application is being reviewed, you can continue accessing all user features:
            placement preparation materials, practice tests, and career guidance resources.
          </p>
        </div>
  
        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://placementtutor.com/dashboard" 
             style="background: linear-gradient(135deg, #2c5282 0%, #4a5568 100%); 
                    color: white; 
                    padding: 14px 32px; 
                    text-decoration: none; 
                    border-radius: 6px; 
                    font-weight: bold; 
                    display: inline-block;
                    font-size: 16px;">
            Return to Dashboard →
          </a>
        </div>
  
        <!-- Important Note -->
        <div style="text-align: center; padding: 15px; background-color: #f7fafc; border-radius: 8px;">
          <p style="margin: 0; color: #718096; font-size: 14px;">
            <strong>Note:</strong> You will be notified via email when your application is approved or rejected.
            For any queries, contact <a href="mailto:mentors@placementtutor.com" style="color: #2c5282;">mentors@placementtutor.com</a>
          </p>
        </div>
      </div>
  
      <!-- Footer -->
      <div style="padding: 20px; text-align: center; color: #718096; font-size: 14px; border-top: 1px solid #eaeaea;">
        <p style="margin: 0 0 10px 0; font-size: 16px; color: #2c5282; font-weight: bold;">Shape Careers. Build Futures. 👨‍💼</p>
        <p style="margin: 0 0 10px 0;">Help students from your alma mater land internships & full-time roles at top companies</p>
        <p style="margin: 10px 0 0 0; font-size: 12px;">© 2024 PlacementTutor. Empowering placement journeys.</p>
      </div>
    </div>
  </body>
  </html>
  `;