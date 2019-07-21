FROM php:7.2-fpm

# Install PHP extensions
RUN apt-get update \
    && apt-get install -y \
        libpng-dev \
        mariadb-client \
    && apt-get clean \
    && apt-get autoclean \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install \
        mbstring \
        pdo \
        pdo_mysql \
        gd \
        zip \
        exif

# Set workdir
WORKDIR /var/www/html

# Install composer
RUN chown -R www-data:www-data /var/www/html \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && chmod +x /usr/local/bin/composer

