import moment from "moment";
import { plainToInstance } from "class-transformer";
import { cloneDeep, concat, isArray, isEmpty, without } from "lodash";

import { IOption } from "../components/ui/select/Select";
// import Job, { FILE, FTP, SFTP, S3, TRIGGER } from '../types/models/Job'
// import { Config, IJob, IServer, Server, ServerConfig } from '../types/models/IJob'
// import {
//   USER,
//   ADMIN,
//   SUPER_USER,
//   SUPER_ADMIN,
//   ERROR_COMMON,
//   ERROR_SYSTEM,
//   ERROR_CREDENTIALS,
//   SYSTEM_ADMINISTRATOR,
// } from './constants'

export const NO_REFETCH = {
  refetchOnWindowFocus: false,
  retry: false,
};

export const getClasses = (
  defaultClass: string[] | string,
  appendClass?: string[] | string,
  removeClass?: string[] | string
) => {
  defaultClass = !isArray(defaultClass)
    ? defaultClass.split(" ")
    : defaultClass;
  appendClass =
    !isArray(appendClass) && appendClass ? appendClass.split(" ") : appendClass;
  removeClass =
    !isArray(removeClass) && removeClass
      ? removeClass.split(" ")
      : (removeClass as string[]);

  const allClasses = concat(defaultClass || [], appendClass || []);
  return without(allClasses, ...(removeClass || [])).join(" ");
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const endpointUrl = (url: string | undefined) => {
  return `${process.env.REACT_APP_API_ENDPOINT}/${url}`;
};

export const search = (haystack: string, keyword: string) => {
  return haystack.toLowerCase().includes(keyword.toLowerCase());
};

export const refetchInterval = (seconds: number) => {
  return seconds * 1000;
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const dateString = (date: string) => {
  let dateString = date.substr(0, date.lastIndexOf(":")).replace(" ", "T");
  dateString = `${dateString}+00:00`;
  return dateString;
};

export const dateFormat = "DD MMM YYYY, hh:mm:ss A";

export const date = (date: string | number | Date) => {
  return moment(date).format(dateFormat);
};

export const s3 = "s3://";
// export const modifyProperty = (key: Server.from_server | Server.to_server, values: IJob) => {
//   const server = values[key]
//   const updateValue = (fields: string[]) => {
//     fields.forEach((field) => {
//       switch (field) {
//         case 'path':
//         case 'host':
//         case 'trigger_pattern':
//           server[field] = ''
//           break
//         default:
//           break
//       }
//     })
//   }

//   const fields = []
//   switch (server.type) {
//     case S3:
//       if (!server.path?.includes(s3)) {
//         server.path = `${s3}${server.path}`
//       }

//       fields.push('host', 'directory')
//       break
//     case FILE:
//       fields.push('path', 'host', 'directory')
//       break
//     case TRIGGER:
//       fields.push('host', 'path')
//       break
//     case FTP:
//     case SFTP:
//       fields.push('path')
//       break
//     default:
//       break
//   }

//   updateValue(fields)
//   return {
//     ...values,
//     [key]: server,
//   }
// }

// export const defaultJobData = (data: IJob, key: Server.from_server | Server.to_server): IJob => {
//   if (!data) return plainToInstance<IJob, any>(Job, {})

//   const job = cloneDeep(data)
//   if (job[key].path) job[key].path = job[key].path?.replace(s3, '')
//   return job
// }

// export const roleOptions: IOption[] = [
//   { id: SUPER_ADMIN, name: SUPER_ADMIN },
//   { id: ADMIN, name: ADMIN },
//   { id: SYSTEM_ADMINISTRATOR, name: SYSTEM_ADMINISTRATOR },
//   { id: SUPER_USER, name: SUPER_USER },
//   { id: USER, name: USER },
// ]

// export const errorMessage = (error?: any) => {
//   let errMsg = ERROR_COMMON

//   switch (error?.response?.status) {
//     case 401:
//       errMsg = error.response.data || ERROR_CREDENTIALS
//       break
//     case 502:
//     case 404:
//     case 400:
//       errMsg = ERROR_SYSTEM
//       break
//     default:
//       errMsg = error.response?.data ? error.response.data : ERROR_COMMON
//       break
//   }

//   return errMsg
// }

export const modifyValues = (value: string, property?: string): string => {
  let newValue = value.includes("true") ? "true" : "false";

  if (property) newValue = `${property}-${newValue}`;
  return newValue;
};

// export const objectToUri = (config: ServerConfig, type: string) => {
//   // "from": "{\"uri\": \"file:system/input/job?recursive=true&delay=10000&delete=true\"}"
//   let uri = ''
//   const agent = {
//     name: '',
//     host: '',
//     port: '',
//   }

//   if (type === FILE && config) {
//     uri = `file:${config.directory}?recursive=${config.recursive}&delay=${config.poll_delay}&delete=${config.delete}`
//   }

//   return { uri, agent }
// }

export const summaryRender = (key: string, value: string | number) => {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">{key}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
};

// export const renderServerDetail = (data: IServer, agent: string) => {
//   return (
//     <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
//       {summaryRender('Agent', agent)}
//       {summaryRender('Type', data.type)}
//       {data.host && summaryRender('Host', data.host)}
//       {data.trigger_pattern && summaryRender('Trigger pattern', data.trigger_pattern)}
//       {/* {data.poll_delay && summaryRender('Poll delay', data.poll_delay)}
//       {data.directory && summaryRender('Directory', data.directory)} */}
//       {data.path && summaryRender('Path', data.path)}
//       {data.username && summaryRender('Username', data.username)}
//       {data.password && summaryRender('Password', '******')}
//     </div>
//   )
// }

// export const renderConfigDetail = (config?: ServerConfig) => {
//   return (
//     <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
//       {config?.directory && summaryRender('Directory', config.directory)}
//       {config?.recursive && summaryRender('Recursive', modifyValues(config.recursive))}
//       {config?.poll_delay && summaryRender('Poll Delay', `${config.poll_delay} (milliseconds)`)}
//     </div>
//   )
// }

export const valueCleanup = (value: string) => {
  const exceptions = ['\\"', '"', "}"];

  for (let exception of exceptions) {
    if (!value.includes(exception)) continue;

    value = value.replace(exception, "");
  }

  return value;
};

// export const uriToObject = (uri: string, type: string) => {
//   const serverConfig: ServerConfig = {};

//   if (isEmpty(uri)) return serverConfig;

//   if (type === FILE) {
//     const [params, query] = uri.split("?");

//     const value = params.split(":");
//     const directory = value.length > 0 ? value.slice(1).join(":") : "";

//     serverConfig.directory = directory;

//     const queries = query.split("&");
//     queries.forEach((query) => {
//       const [key, value] = query.split("=");
//       if (key === "delay") serverConfig.poll_delay = valueCleanup(value);
//       if (key === "delete")
//         serverConfig.delete = modifyValues(valueCleanup(value), "delete");
//       if (key === "recursive")
//         serverConfig.recursive = modifyValues(valueCleanup(value), "recursive");
//     });
//   }

//   return serverConfig;
// };

// export const modifyJobs = (job: IJob) => {
//   const modifiedData = { ...job };
//   const sourceConfig = uriToObject(
//     modifiedData.from?.uri || "",
//     modifiedData.from_server?.type || "File"
//   );
//   const destinationConfig = uriToObject(
//     modifiedData.to?.uri || "",
//     modifiedData.to_server?.type || "File"
//   );

//   const server = {
//     path: "",
//     host: "",
//     type: modifiedData.type,
//   };

//   const to_agent = modifiedData.to?.agent?.name || "";
//   const from_agent = modifiedData.from?.agent?.name || "";

//   delete modifiedData.from;
//   delete modifiedData.to;

//   return {
//     ...modifiedData,
//     to_agent,
//     from_agent,
//     to_server: server,
//     from_server: server,
//     [Config.source]: sourceConfig,
//     [Config.destination]: destinationConfig,
//   };
// };

export const generateExprireTime = (time: number): string => {
  return `${Date.now() + time * 1000}`;
};
