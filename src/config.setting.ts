import * as Joi from '@hapi/joi';

const configSetting = {
    envFilePath: `env/${process.env.NODE_ENV || 'development'}.env`,
    isGlobal: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .valid('development', 'production', 'test', 'provision')
            .default('development'),
        PORT: Joi.number().default(9999),
        MONGODB_URI: Joi.string().required()
    })
}

export default configSetting;