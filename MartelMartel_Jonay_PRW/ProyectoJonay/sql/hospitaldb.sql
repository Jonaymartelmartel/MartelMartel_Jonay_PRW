DROP DATABASE IF EXISTS hospitaldb;
CREATE DATABASE IF NOT EXISTS hospitaldb;
USE hospitaldb;

CREATE TABLE IF NOT EXISTS usuario(
    id_usuario INT NOT NULL AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    CONSTRAINT PK_USUARIO PRIMARY KEY (id_usuario)
);

CREATE TABLE IF NOT EXISTS token(
    id_token INT NOT NULL AUTO_INCREMENT,
    token VARCHAR(100) NOT NULL,
    fechaCreacion DATE NOT NULL,
    fechaExpiracion DATE NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT PK_TOKEN PRIMARY KEY (id_token)
);

CREATE TABLE IF NOT EXISTS hospital(
    cod_hospital INT NOT NULL AUTO_INCREMENT,
    cif_hospital INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    telefono NUMERIC(9,0) NOT NULL,
    CONSTRAINT PK_HOSPITAL PRIMARY KEY (cod_hospital)
);

CREATE TABLE IF NOT EXISTS salas_espera(
    cod_salas_espera INT NOT NULL AUTO_INCREMENT,
    num_sillas INT NOT NULL,
    cod_hospital INT NOT NULL,
    CONSTRAINT PK_SALAS_ESPERA PRIMARY KEY (cod_salas_espera)
);

CREATE TABLE IF NOT EXISTS pacientes(
    cod_pac INT NOT NULL AUTO_INCREMENT,
    dni_pac VARCHAR(9) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    edad NUMERIC(3,0) NOT NULL,
    telefono NUMERIC(9,0) NOT NULL,
    cod_hospital INT NOT NULL,
    cod_salas_espera INT NOT NULL,
    CONSTRAINT PK_PACIENTES PRIMARY KEY (cod_pac)
);

CREATE TABLE IF NOT EXISTS expediente(
    cod_expediente INT NOT NULL AUTO_INCREMENT,
    vacunas VARCHAR(100) NOT NULL,
    historial_medico VARCHAR(200) NOT NULL,
    enfermedades VARCHAR(100) NOT NULL,
    cod_pac INT NOT NULL,
    CONSTRAINT PK_EXPEDIENTE PRIMARY KEY (cod_expediente)
);

CREATE TABLE IF NOT EXISTS personal(
    cod_per INT NOT NULL AUTO_INCREMENT,
    dni_per VARCHAR(9) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    salario NUMERIC(7,0) NOT NULL,
    contrato VARCHAR(100) NOT NULL,
    cod_hospital INT NOT NULL,
    CONSTRAINT PK_PERSONAL PRIMARY KEY (cod_per)
);

CREATE TABLE IF NOT EXISTS tipo_personal(
    id_tipo_personal INT NOT NULL AUTO_INCREMENT,
    tipo_personal VARCHAR(100) NOT NULL,
    cod_per INT NOT NULL,
    CONSTRAINT PK_TIPO_PERSONAL PRIMARY KEY (id_tipo_personal)
);

CREATE TABLE IF NOT EXISTS medicos(
    cod_medicos INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    id_tipo_personal INT NOT NULL,
    CONSTRAINT PK_MEDICOS PRIMARY KEY (cod_medicos)
);

CREATE TABLE IF NOT EXISTS director(
    cod_director INT NOT NULL AUTO_INCREMENT,
    id_tipo_personal INT NOT NULL,
    CONSTRAINT PK_DIRECTOR PRIMARY KEY (cod_director)
);

CREATE TABLE IF NOT EXISTS tipo_medicos(
    id_tipo_medicos INT NOT NULL AUTO_INCREMENT,
    tipo_medicos VARCHAR(100) NOT NULL,
    cod_medicos INT NOT NULL,
    CONSTRAINT PK_TIPO_MEDICOS PRIMARY KEY (id_tipo_medicos)
);

CREATE TABLE IF NOT EXISTS analista(
    cod_analista INT NOT NULL AUTO_INCREMENT,
    num_colegiado INT NOT NULL,
    id_tipo_medicos INT NOT NULL,
    CONSTRAINT PK_ANALISTA PRIMARY KEY (cod_analista)
);

CREATE TABLE IF NOT EXISTS cirujano(
    cod_cirujano INT NOT NULL AUTO_INCREMENT,
    num_colegiado INT NOT NULL,
    id_tipo_medicos INT NOT NULL,
    CONSTRAINT PK_CIRUJANO PRIMARY KEY (cod_cirujano)
);

ALTER TABLE token ADD CONSTRAINT FK_TOKEN FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE;

ALTER TABLE salas_espera ADD CONSTRAINT FK_SALAS_ESPERA FOREIGN KEY (cod_hospital) REFERENCES hospital(cod_hospital) ON DELETE CASCADE;

ALTER TABLE pacientes ADD CONSTRAINT FK_PACIENTES FOREIGN KEY (cod_hospital) REFERENCES hospital(cod_hospital) ON DELETE CASCADE;

ALTER TABLE pacientes ADD CONSTRAINT FK_PACIENTES1 FOREIGN KEY (cod_salas_espera) REFERENCES salas_espera(cod_salas_espera) ON DELETE CASCADE;

ALTER TABLE expediente ADD CONSTRAINT FK_EXPEDIENTE FOREIGN KEY (cod_pac) REFERENCES pacientes(cod_pac) ON DELETE CASCADE;

ALTER TABLE personal ADD CONSTRAINT FK_PERSONAL FOREIGN KEY (cod_hospital) REFERENCES hospital(cod_hospital) ON DELETE CASCADE;

ALTER TABLE tipo_personal ADD CONSTRAINT FK_TIPO_PERSONAL FOREIGN KEY (cod_per) REFERENCES personal(cod_per) ON DELETE CASCADE;

ALTER TABLE medicos ADD CONSTRAINT FK_MEDICOS FOREIGN KEY (id_tipo_personal) REFERENCES tipo_personal(id_tipo_personal) ON DELETE CASCADE;

ALTER TABLE director ADD CONSTRAINT FK_DIRECTOR FOREIGN KEY (id_tipo_personal) REFERENCES tipo_personal(id_tipo_personal) ON DELETE CASCADE;

ALTER TABLE tipo_medicos ADD CONSTRAINT FK_TIPO_MEDICOS FOREIGN KEY (cod_medicos) REFERENCES medicos(cod_medicos) ON DELETE CASCADE;

ALTER TABLE analista ADD CONSTRAINT FK_ANALISTA FOREIGN KEY (id_tipo_medicos) REFERENCES tipo_medicos(id_tipo_medicos) ON DELETE CASCADE;

ALTER TABLE cirujano ADD CONSTRAINT FK_CIRUJANO FOREIGN KEY (id_tipo_medicos) REFERENCES tipo_medicos(id_tipo_medicos) ON DELETE CASCADE;

INSERT INTO usuario (usuario, contrasena) VALUES ('admin', '1234'), ('jonay', '1234');

INSERT INTO token (token, fechaCreacion, fechaExpiracion, id_usuario) VALUES ('token123', '2024-04-24', '2024-05-24', 1), ('token456', '2024-04-24', '2024-05-24', 2);

INSERT INTO hospital (cif_hospital, nombre, direccion, localidad, telefono) VALUES (12345, 'Hospital Vecindario', 'Calle 1', 'Vecindario', 111111111), (54321, 'Hospital Las Palmas', 'Calle 2', 'Las Palmas', 222222222), (25314, 'Hospital Arinaga', 'Calle 5', 'Arinaga', 333333333);

INSERT INTO salas_espera (num_sillas, cod_hospital) VALUES (33, 1), (69, 2), (77, 3);

INSERT INTO pacientes (dni_pac, nombre, apellidos, edad, telefono, cod_hospital, cod_salas_espera) VALUES ('54270592E', 'Jonay', 'Martel Martel', 19, 666376019, 1, 1), ('54070070Z', 'Maite', 'Martel Ventura', 47, 658930822, 2, 2), ('65432198C', 'Isabelino', 'Martel Martel', 44, 606930689, 3, 3);

INSERT INTO expediente (vacunas, historial_medico, enfermedades, cod_pac) VALUES ('Pfizer', 'Lesión de rodillas a los 7 años', 'Ninguna', 1), ('Contra la malaria', 'Operado de la cadera', 'Colitis ulcerosa', 2), ('HEPATITIS B', 'Operado de la vista', 'Ninguna', 3);

INSERT INTO personal (dni_per, nombre, apellidos, salario, contrato, cod_hospital) VALUES ('54270592E', 'Jonay', 'Martel Martel', 2000, 'Fijo', 1), ('54070070Z', 'Maite', 'Martel Ventura', 2500, 'Variable', 2), ('65432198C', 'Isabelino', 'Martel Martel', 3000, 'Variable', 3);

INSERT INTO tipo_personal (tipo_personal, cod_per) VALUES ('Director', 1), ('Medicos', 2), ('Medicos', 3);

INSERT INTO medicos (nombre, especialidad, id_tipo_personal) VALUES ('Maite', 'Analisis', 1), ('Isabelino', 'Ortopedia', 2);

INSERT INTO director (id_tipo_personal) VALUES (1);

INSERT INTO tipo_medicos (tipo_medicos, cod_medicos) VALUES ('Analista', 1), ('Cirujano', 2);

INSERT INTO analista (num_colegiado, id_tipo_medicos) VALUES (534534, 1), (345345, 2);

INSERT INTO cirujano (num_colegiado, id_tipo_medicos) VALUES (423434, 1), (324324, 2);
