-- CreateTable
CREATE TABLE `usuario` (
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `nombre` VARCHAR(20) NOT NULL,
    `apellido` VARCHAR(30) NOT NULL,
    `rol` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id_evento` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(30) NOT NULL,
    `fecha` DATE NOT NULL,
    `lugar` VARCHAR(40) NOT NULL,
    `valor` INTEGER NOT NULL,

    PRIMARY KEY (`id_evento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscrito` (
    `id_inscrito` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(30) NOT NULL,
    `nombre` VARCHAR(20) NOT NULL,
    `apellido` VARCHAR(30) NOT NULL,
    `id_evento` INTEGER NOT NULL,

    PRIMARY KEY (`id_inscrito`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inscrito` ADD CONSTRAINT `inscrito_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `evento`(`id_evento`) ON DELETE RESTRICT ON UPDATE CASCADE;
