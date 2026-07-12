import { Router } from 'express';

const swaggerDocsRouter = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Health check
 *     description: Confirms the backend is running.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is online.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: API Working
 */
swaggerDocsRouter.get('/', (req, res) => res.send('API Working'));

/**
 * @openapi
 * /api/doctors/login:
 *   post:
 *     summary: Doctor login
 *     description: Authenticates a doctor and returns a JWT token.
 *     tags: [Authentication, Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: doctor@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Doctor authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorLoginResponse'
 *       400:
 *         description: Missing credentials.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/doctors:
 *   get:
 *     summary: List doctors
 *     description: Retrieves a paginated list of doctors.
 *     tags: [Doctors]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Search by doctor name, specialization, or email.
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 200 }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *     responses:
 *       200:
 *         description: Doctors returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorListResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     summary: Create doctor
 *     description: Creates a doctor profile and returns a JWT for immediate use.
 *     tags: [Doctors, Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *               name: { type: string }
 *               specialization: { type: string }
 *               availability: { type: string, enum: [Available, Unavailable] }
 *               experience: { type: string }
 *               qualifications: { type: string }
 *               location: { type: string }
 *               about: { type: string }
 *               fee: { type: number }
 *               schedule: { type: string, description: 'JSON stringified schedule object' }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Doctor created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorCreateResponse'
 *       400:
 *         description: Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by id
 *     description: Retrieves a single doctor profile.
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Doctor returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorResponse'
 *       404:
 *         description: Doctor not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: Update doctor
 *     description: Updates an authenticated doctor's profile.
 *     tags: [Doctors, Uploads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               specialization: { type: string }
 *               availability: { type: string, enum: [Available, Unavailable] }
 *               fee: { type: number }
 *               image: { type: string, format: binary }
 *               schedule: { type: string, description: 'JSON stringified schedule object' }
 *     responses:
 *       200:
 *         description: Doctor updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorResponse'
 *       403:
 *         description: Forbidden for this doctor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Doctor not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Delete doctor
 *     description: Removes a doctor profile.
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Doctor deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Doctor not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/doctors/{id}/toggle-availability:
 *   post:
 *     summary: Toggle doctor availability
 *     description: Switches a doctor's availability between Available and Unavailable.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Availability updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DoctorResponse'
 *       401:
 *         description: Authentication required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/appointments:
 *   get:
 *     summary: List appointments
 *     description: Returns appointment records filtered by query parameters.
 *     tags: [Appointments, Admin]
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         schema: { type: string }
 *       - in: query
 *         name: mobile
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 50 }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: patientClerkId
 *         schema: { type: string }
 *       - in: query
 *         name: createdBy
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Appointment list returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentListResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     summary: Create appointment
 *     description: Creates a doctor appointment booking and can start a Stripe checkout session.
 *     tags: [Appointments, Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentCreateInput'
 *     responses:
 *       201:
 *         description: Appointment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentCreateResponse'
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Doctor not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Duplicate appointment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/appointments/me:
 *   get:
 *     summary: Get appointments for current patient
 *     description: Returns the current patient's appointments using the authenticated Clerk identity.
 *     tags: [Users, Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: createdBy
 *         schema: { type: string }
 *       - in: query
 *         name: mobile
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Appointments returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientAppointmentsResponse'
 *       401:
 *         description: Authentication required.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/appointments/confirm:
 *   get:
 *     summary: Confirm appointment payment
 *     description: Confirms a Stripe checkout session and updates the appointment payment status.
 *     tags: [Payments, Appointments]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Payment confirmed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentResponse'
 *       400:
 *         description: Payment incomplete or missing session id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Session or appointment not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/appointments/stats/summary:
 *   get:
 *     summary: Appointment stats summary
 *     description: Returns a summary of appointment metrics.
 *     tags: [Admin, Appointments]
 *     responses:
 *       200:
 *         description: Summary returned.
 */

/**
 * @openapi
 * /api/appointments/doctor/{doctorId}:
 *   get:
 *     summary: Get appointments by doctor
 *     description: Retrieves appointments for a specific doctor.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Appointments returned.
 */

/**
 * @openapi
 * /api/appointments/paitents/count:
 *   get:
 *     summary: Registered patient count
 *     description: Returns the total number of registered patient users.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Count returned.
 */

/**
 * @openapi
 * /api/appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     description: Updates an existing appointment record.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }
 *               notes: { type: string }
 *     responses:
 *       200:
 *         description: Appointment updated.
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Server error.
 *   post:
 *     summary: Cancel appointment
 *     description: Cancels an appointment by id.
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Appointment canceled.
 *       404:
 *         description: Appointment not found.
 */

/**
 * @openapi
 * /api/services:
 *   get:
 *     summary: List services
 *     description: Returns all services available in the catalog.
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: Services returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceListResponse'
 *   post:
 *     summary: Create service
 *     description: Creates a new service with image upload support.
 *     tags: [Services, Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               about: { type: string }
 *               shortDescription: { type: string }
 *               price: { type: number }
 *               availability: { type: string, enum: [available, unavailable, true, false] }
 *               instructions: { type: string, description: 'JSON array or comma-separated values' }
 *               slots: { type: string, description: 'JSON array of slot strings' }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Service created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceResponse'
 *       500:
 *         description: Server error.
 */

/**
 * @openapi
 * /api/services/{id}:
 *   get:
 *     summary: Get service by id
 *     description: Retrieves a single service by id.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceResponse'
 *       404:
 *         description: Service not found.
 *   put:
 *     summary: Update service
 *     description: Updates an existing service and can replace its image.
 *     tags: [Services, Uploads]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               about: { type: string }
 *               shortDescription: { type: string }
 *               price: { type: number }
 *               availability: { type: string }
 *               instructions: { type: string }
 *               slots: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Service updated.
 *       404:
 *         description: Service not found.
 *   delete:
 *     summary: Delete service
 *     description: Deletes a service.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service deleted.
 *       404:
 *         description: Service not found.
 */

/**
 * @openapi
 * /api/service-appointments:
 *   get:
 *     summary: List service appointments
 *     description: Returns service appointment records.
 *     tags: [Services, Appointments]
 *     parameters:
 *       - in: query
 *         name: serviceId
 *         schema: { type: string }
 *       - in: query
 *         name: mobile
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 50 }
 *     responses:
 *       200:
 *         description: Service appointments returned.
 *   post:
 *     summary: Create service appointment
 *     description: Creates a service booking and can initiate Stripe checkout.
 *     tags: [Services, Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceAppointmentCreateInput'
 *     responses:
 *       201:
 *         description: Service appointment created.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Authentication required.
 *       409:
 *         description: Duplicate booking.
 *       500:
 *         description: Server error.
 */

/**
 * @openapi
 * /api/service-appointments/confirm:
 *   get:
 *     summary: Confirm service appointment payment
 *     description: Confirms Stripe payment for a service booking.
 *     tags: [Payments, Services]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Payment confirmed.
 *       400:
 *         description: Payment incomplete.
 *       404:
 *         description: Appointment not found.
 */

/**
 * @openapi
 * /api/service-appointments/me:
 *   get:
 *     summary: Get service appointments for current patient
 *     description: Returns service appointments for the authenticated patient.
 *     tags: [Users, Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: createdBy
 *         schema: { type: string }
 *       - in: query
 *         name: mobile
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service appointments returned.
 */

/**
 * @openapi
 * /api/service-appointments/stats/summary:
 *   get:
 *     summary: Service appointment stats summary
 *     description: Returns aggregated service booking statistics.
 *     tags: [Admin, Services]
 *     responses:
 *       200:
 *         description: Stats returned.
 */

/**
 * @openapi
 * /api/service-appointments/{id}:
 *   get:
 *     summary: Get service appointment by id
 *     description: Returns a single service appointment.
 *     tags: [Services, Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service appointment returned.
 *       404:
 *         description: Service appointment not found.
 *   put:
 *     summary: Update service appointment
 *     description: Updates the status or payment details for a service appointment.
 *     tags: [Services, Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }
 *               notes: { type: string }
 *               payment: { type: object }
 *     responses:
 *       200:
 *         description: Service appointment updated.
 *   post:
 *     summary: Cancel service appointment
 *     description: Cancels a service appointment.
 *     tags: [Services, Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Service appointment canceled.
 *       400:
 *         description: Cannot cancel completed appointment.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: false }
 *         message: { type: string, example: 'Server error' }
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         message: { type: string, example: 'Operation completed' }
 *     Doctor:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         id: { type: string }
 *         name: { type: string }
 *         email: { type: string, format: email }
 *         specialization: { type: string }
 *         availability: { type: string, enum: [Available, Unavailable] }
 *         experience: { type: string }
 *         qualifications: { type: string }
 *         location: { type: string }
 *         about: { type: string }
 *         fee: { type: number }
 *         rating: { type: number }
 *         schedule: { type: object, additionalProperties: { type: array, items: { type: string } } }
 *         imageUrl: { type: string, nullable: true }
 *         imagePublicId: { type: string, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     DoctorLoginResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         token: { type: string }
 *         data:
 *           $ref: '#/components/schemas/Doctor'
 *     DoctorResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         data:
 *           $ref: '#/components/schemas/Doctor'
 *     DoctorCreateResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         data:
 *           $ref: '#/components/schemas/Doctor'
 *         token: { type: string }
 *     DoctorListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Doctor'
 *         doctors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Doctor'
 *         meta:
 *           type: object
 *           properties:
 *             page: { type: integer }
 *             limit: { type: integer }
 *             total: { type: integer }
 *     Appointment:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         owner: { type: string }
 *         createdBy: { type: string, nullable: true }
 *         patientName: { type: string }
 *         mobile: { type: string }
 *         age: { type: integer, nullable: true }
 *         gender: { type: string }
 *         doctorId: { type: string }
 *         doctorName: { type: string }
 *         speciality: { type: string }
 *         doctorImage:
 *           type: object
 *           properties:
 *             url: { type: string }
 *             publicId: { type: string }
 *         date: { type: string }
 *         time: { type: string }
 *         fees: { type: number }
 *         status: { type: string, enum: [Pending, Confirmed, Completed, Canceled, Rescheduled] }
 *         payment:
 *           type: object
 *           properties:
 *             method: { type: string, enum: [Cash, Online] }
 *             status: { type: string, enum: [Pending, Paid, Failed, Refunded] }
 *             amount: { type: number }
 *             providerId: { type: string }
 *         sessionId: { type: string, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     AppointmentCreateInput:
 *       type: object
 *       required: [doctorId, patientName, mobile, date, time]
 *       properties:
 *         doctorId: { type: string }
 *         patientName: { type: string }
 *         mobile: { type: string }
 *         age: { type: integer }
 *         gender: { type: string }
 *         date: { type: string, example: '2026-08-15' }
 *         time: { type: string, example: '10:30 AM' }
 *         fee: { type: number, example: 500 }
 *         fees: { type: number, example: 500 }
 *         notes: { type: string }
 *         email: { type: string, format: email }
 *         paymentMethod: { type: string, enum: [Cash, Online], example: 'Online' }
 *         owner: { type: string }
 *         doctorName: { type: string }
 *         speciality: { type: string }
 *         doctorImageUrl: { type: string }
 *         doctorImagePublicId: { type: string }
 *     AppointmentCreateResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         appointment:
 *           $ref: '#/components/schemas/Appointment'
 *         checkoutUrl: { type: string, nullable: true }
 *     AppointmentResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         appointment:
 *           $ref: '#/components/schemas/Appointment'
 *     AppointmentListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         appointments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Appointment'
 *         meta:
 *           type: object
 *           properties:
 *             page: { type: integer }
 *             limit: { type: integer }
 *             total: { type: integer }
 *             count: { type: integer }
 *     PatientAppointmentsResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         appointments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Appointment'
 *     Service:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         about: { type: string }
 *         shortDescription: { type: string }
 *         price: { type: number }
 *         available: { type: boolean }
 *         imageUrl: { type: string, nullable: true }
 *         imagePublicId: { type: string, nullable: true }
 *         instructions:
 *           type: array
 *           items: { type: string }
 *         slots:
 *           type: object
 *           additionalProperties:
 *             type: array
 *             items: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     ServiceResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         data:
 *           $ref: '#/components/schemas/Service'
 *         message: { type: string }
 *     ServiceListResponse:
 *       type: object
 *       properties:
 *         success: { type: boolean, example: true }
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Service'
 *     ServiceAppointment:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         createdBy: { type: string, nullable: true }
 *         patientName: { type: string }
 *         mobile: { type: string }
 *         age: { type: integer, nullable: true }
 *         gender: { type: string }
 *         serviceId: { type: string }
 *         serviceName: { type: string }
 *         serviceImage:
 *           type: object
 *           properties:
 *             url: { type: string }
 *             publicId: { type: string }
 *         fees: { type: number }
 *         date: { type: string }
 *         hour: { type: integer }
 *         minute: { type: integer }
 *         ampm: { type: string, enum: [AM, PM] }
 *         status: { type: string, enum: [Pending, Confirmed, Rescheduled, Completed, Canceled] }
 *         payment:
 *           type: object
 *           properties:
 *             method: { type: string, enum: [Cash, Online] }
 *             status: { type: string, enum: [Pending, Paid, Failed, Refunded] }
 *             amount: { type: number }
 *             providerId: { type: string }
 *             sessionId: { type: string }
 *     ServiceAppointmentCreateInput:
 *       type: object
 *       required: [serviceId, patientName, mobile, date, hour, minute, ampm]
 *       properties:
 *         serviceId: { type: string }
 *         serviceName: { type: string }
 *         patientName: { type: string }
 *         mobile: { type: string }
 *         age: { type: integer }
 *         gender: { type: string }
 *         date: { type: string, example: '2026-08-15' }
 *         hour: { type: integer, example: 10 }
 *         minute: { type: integer, example: 30 }
 *         ampm: { type: string, enum: [AM, PM], example: 'AM' }
 *         paymentMethod: { type: string, enum: [Cash, Online], example: 'Online' }
 *         amount: { type: number, example: 700 }
 *         fees: { type: number, example: 700 }
 *         email: { type: string, format: email }
 *         notes: { type: string }
 *         meta: { type: object }
 *         serviceImageUrl: { type: string }
 *         serviceImagePublicId: { type: string }
 */

export default swaggerDocsRouter;
