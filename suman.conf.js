var os = require('os');
var path = require('path');
var numOfCPUs = os.cpus().length || 1;
module.exports = {
    matchAny: [],
    matchNone: [/fixture/, /.*target/],
    matchAll: [/\.test\.js$/],
    testDir: 'test',
    testSrcDir: 'test/all',
    sumanHelpersDir: 'test/.suman',
    uniqueAppName: '<your-app-name-here>',
    browser: 'Firefox',
    logsDir: process.env['SUMAN_LOGS_DIR'],
    allowSymlinks: false,
    bundleWithChaiAssertions: false,
    autoLoggingPre: true,
    autoLoggingPost: true,
    autoLoggingIoc: true,
    autoLoggingHooks: true,
    installSumanExtraDeps: true,
    autoLoggingTestCases: true,
    isLogChildStdout: false,
    isLogChildStderr: true,
    includeSumanGlobalsInPath: true,
    useSumanUtilityPatches: true,
    useTAPOutput: false,
    errorsOnly: false,
    replayErrorsAtRunnerEnd: true,
    logStdoutToTestLogs: false,
    allowArrowFunctionsForTestBlocks: false,
    alwaysUseRunner: false,
    enforceGlobalInstallationOnly: false,
    enforceLocalInstallationOnly: false,
    sourceTopLevelDepsInPackageDotJSON: false,
    enforceTestCaseNames: true,
    enforceBlockNames: true,
    enforceHookNames: false,
    bail: true,
    bailRunner: true,
    useBabelRegister: false,
    executeRunnerCWDAtTestFile: true,
    sendStderrToSumanErrLogOnly: true,
    useSuiteNameInTestCaseOutput: false,
    ultraSafe: false,
    verbose: true,
    checkMemoryUsage: false,
    fullStackTraces: false,
    disableAutoOpen: false,
    suppressRunnerOutput: true,
    allowCollectUsageStats: true,
    highestPerformance: false,
    saveLogsForThisManyPastRuns: 5,
    verbosity: 5,
    maxParallelProcesses: Math.max(6, numOfCPUs),
    resultsCapCount: 100,
    resultsCapSize: 7000,
    defaultHookTimeout: 5000,
    defaultTestCaseTimeout: 5000,
    timeoutToSearchForAvailServer: 2000,
    defaultDelayFunctionTimeout: 8000,
    defaultChildProcessTimeout: 8000000,
    defaultTestSuiteTimeout: 15000,
    expireResultsAfter: 10000000,
    coverage: {
        coverageDir: 'coverage',
        nyc: {
            use: false,
        },
        istanbul: {}
    },
    watch: {
        '//tests': {
            'default': {
                script: function (p) {
                    return "./node_modules/.bin/suman " + p;
                },
                include: [],
                exclude: ['^test.*']
            }
        },
        '//project': {
            'default': {
                script: './node_modules/.bin/suman',
                include: [],
                exclude: ['^test.*']
            }
        },
    },
    reporters: {
        'tap': 'suman/reporters/tap'
    },
    servers: {
        '*default': {
            host: '127.0.0.1',
            port: 6969
        },
        '###': {
            host: '127.0.0.1',
            port: 6969
        },
    },
    babelRegisterOpts: {
        ignore: /fixture/,
        extensions: ['.es6', '.es', '.jsx', '.js']
    }
};
