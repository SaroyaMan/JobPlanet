export class Consts {

    public static readonly PING_INTERVAL_IN_MILLISECONDS = 60000; // 60 Seconds
    public static readonly BASIC_LOADING_MSG = 'Loading...';
    public static readonly DATE_FORMAT = 'DD/MM/YYYY HH:mm';

    public static readonly AUTH_TOKEN_PROP_NAME = 'auth_Token';

    public static readonly MAX_SKILLS_ALLOWED = 7;

    public static readonly NUM_OF_CHARS = 250;

    public static readonly MAX_RANKING_FEEDBACK = 10;


    public static readonly WEB_SERVICE_BASE_DEBUG = 'http://localhost:9485';
    public static readonly WEB_SERVICE_URL_DEBUG = 'http://localhost:9485/api';

    public static readonly WEB_SERVICE_BASE_PROD = 'http://jobplanet.azurewebsites.net';
    public static readonly WEB_SERVICE_URL_PROD = 'http://jobplanet.azurewebsites.net/api';


    public static readonly IS_DEBUG = true;

    public static readonly WEB_SERVICE_BASE = Consts.IS_DEBUG ? Consts.WEB_SERVICE_BASE_DEBUG : Consts.WEB_SERVICE_BASE_PROD;
    public static readonly WEB_SERVICE_URL = Consts.IS_DEBUG ? Consts.WEB_SERVICE_URL_DEBUG : Consts.WEB_SERVICE_URL_PROD;

}