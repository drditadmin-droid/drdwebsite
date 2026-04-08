-- =====================
-- SERVICES
-- =====================
create table services (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    duration_minutes integer not null default 30,
    price numeric(10, 2),
    is_active boolean default true,
    created_at timestamp default now()
);

-- =====================
-- PATIENTS
-- =====================
create table patients (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    phone text unique not null,
    email text,
    created_at timestamp default now()
);

-- =====================
-- APPOINTMENTS
-- =====================
create table appointments (
    id uuid primary key default gen_random_uuid(),
    patient_id uuid references patients(id) on delete cascade,
    service_id uuid references services(id) on delete set null,
    appointment_date date not null,
    appointment_time time not null,
    notes text,
    status text default 'pending',
    created_at timestamp default now(),
    unique (appointment_date, appointment_time)
);

-- =====================
-- CONTACTS
-- =====================
create table contacts (
    id uuid primary key default gen_random_uuid(),
    name text,
    email text,
    message text,
    created_at timestamp default now()
);

-- =====================
-- SAMPLE SERVICES DATA
-- =====================
insert into services (name, duration_minutes, price, is_active) values
    ('General Checkup', 30, 500.00, true),
    ('Teeth Cleaning', 45, 800.00, true),
    ('Tooth Extraction', 60, 1500.00, true),
    ('Root Canal Treatment', 90, 5000.00, true),
    ('Dental Filling', 45, 1200.00, true),
    ('Teeth Whitening', 60, 3000.00, true),
    ('Braces Consultation', 30, 500.00, true),
    ('X-Ray', 15, 400.00, true);
