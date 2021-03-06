import { CliAnswerModel } from '../../../domain/model/prompt_answer'
import { CliResponse, BaseResponse } from '../../../domain/model/workers'
import { MainWorker } from '../../../domain/workers/main_worker';
import { Utils } from '../../../domain/workers/utils';
import conf from  '../../../domain/config/static.config.json'
import { Static } from '../../../domain/model/config';
let staticConf: Static = conf as Static;

jest.mock('../../../domain/workers/utils')

let mock_answer_ssr = <CliAnswerModel>{
    project_name: "foo",
    project_type: "ssr",
    platform: "aks",
    deployment: "tfs",
    create_config: true
}

let mock_answer_csr = <CliAnswerModel>{
    project_name: "foo",
    project_type: "csr",
    platform: "aks",
    deployment: "tfs",
    create_config: true
}

let mock_answer_java_spring = <CliAnswerModel>{
    project_name: "foo",
    project_type: "java_spring",
    platform: "aks",
    deployment: "tfs",
    create_config: true
}

let mock_answer_netcore = <CliAnswerModel>{
    project_name: "foo",
    project_type: "netcore",
    platform: "aks",
    deployment: "tfs",
    create_config: true
}

let worker_response = <BaseResponse> {
    message: `${mock_answer_ssr.project_name} created`,
    ok: true
}

let mainWorker = new MainWorker()
Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve({})
})

describe("mainWorker class tests", () => {

    describe("Positive assertions", () => {
        beforeEach(async () => {})
        it("ssr_aks_tfs should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `${mock_answer_ssr.project_name} created`, temp_path: "/var/test", final_path: "/opt/myapp"})
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            let flow_ran: CliResponse = await mainWorker.ssr_aks_tfs(mock_answer_ssr)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(`cd ${mock_answer_ssr.project_name}/src && npm install && npm run build && npm run start`)
        })
        it("csr_aks_tfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `${mock_answer_ssr.project_name} created`, temp_path: "/var/test", final_path: "/opt/myapp"})
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })

            let flow_ran: CliResponse = await mainWorker.csr_aks_tfs(mock_answer_csr)
            expect(Utils.doGitClone).toHaveBeenCalledWith(staticConf.csr.git_repo, "/var/test", staticConf.csr.local_path, staticConf.csr.git_ref)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(`cd ${mock_answer_ssr.project_name}/src && npm install && npm run stuff`)
        })
        it("netcore_aks_tfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `${mock_answer_ssr.project_name} created`, temp_path: "/var/test", final_path: "/opt/myapp"})
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.fileNameReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            
            let flow_ran: CliResponse = await mainWorker.netcore_aks_tfs(mock_answer_netcore)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.doGitClone).toHaveBeenCalledWith(staticConf.netcore.git_repo, "/var/test", staticConf.netcore.local_path, staticConf.netcore.git_ref)
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(`cd ${mock_answer_ssr.project_name}/src`)
            expect(flow_ran.message).toMatch(`dotnet clean && dotnet restore`)
        })
        it("java_spring_aks_tfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `${mock_answer_ssr.project_name} created`, temp_path: "/var/test", final_path: "/opt/myapp"})
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })

            let flow_ran: CliResponse = await mainWorker.java_spring_aks_tfs(mock_answer_java_spring)
            expect(Utils.doGitClone).toHaveBeenCalledWith(staticConf.java_spring.git_repo, "/var/test", staticConf.java_spring.local_path, staticConf.java_spring.git_ref)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(`cd ${mock_answer_ssr.project_name}/src`)
            expect(flow_ran.message).toMatch(`gradle build && gradle run `)
        })
    })
    describe("Negative assertions", () => {
        it("ssr_aks_tfs should return a code of -1 when error occurs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened");
            });
            let flow_ran: CliResponse = await mainWorker.ssr_aks_tfs(mock_answer_ssr)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        }),
        it("netcore_aks_tfs should return a code of -1 when error occurs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened");
            });
            let flow_ran: CliResponse = await mainWorker.netcore_aks_tfs(mock_answer_netcore)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        }),
        it("java_spring_aks_tfs should return a code of -1 when error occurs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened");
            });
            let flow_ran: CliResponse = await mainWorker.java_spring_aks_tfs(mock_answer_java_spring)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        }),
        it("csr_aks_tfs should return a code of -1 when error occurs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened");
            });
            let flow_ran: CliResponse = await mainWorker.csr_aks_tfs(mock_answer_csr)
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        })
    })
})

